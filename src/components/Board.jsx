import { Box, Typography, Paper, Button } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import Column from './Column'
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { arrayMove, SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { useState } from 'react'
import TaskCard from './TaskCard'

function Board({ boardData, setBoardData }) {
  const [activeId, setActiveId] = useState(null)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event) => {
    setActiveId(event.active.id)
  }

  const handleDragEnd = (event) => {
    const { active, over } = event

    if (!over) {
      setActiveId(null)
      return
    }

    const activeId = active.id
    const overId = over.id

    // Tìm column chứa task đang kéo
    const activeColumn = findColumnByTaskId(activeId)
    const overColumn = findColumnByTaskId(overId) || findColumnById(overId)

    if (!activeColumn || !overColumn) {
      setActiveId(null)
      return
    }

    // Nếu kéo trong cùng một column
    if (activeColumn.id === overColumn.id) {
      const column = boardData.columns[activeColumn.id]
      const oldIndex = column.taskIds.indexOf(activeId)
      const newIndex = column.taskIds.indexOf(overId)

      if (oldIndex !== newIndex) {
        const newTaskIds = arrayMove(column.taskIds, oldIndex, newIndex)
        setBoardData({
          ...boardData,
          tasks: {
            ...boardData.tasks,
            [activeId]: {
              ...boardData.tasks[activeId],
              updatedAt: new Date().toISOString(),
            },
          },
          columns: {
            ...boardData.columns,
            [activeColumn.id]: {
              ...column,
              taskIds: newTaskIds,
            },
          },
        })
      }
    } else {
      // Kéo giữa các column khác nhau
      const sourceColumn = boardData.columns[activeColumn.id]
      const destColumn = boardData.columns[overColumn.id]

      const sourceTaskIds = [...sourceColumn.taskIds]
      const destTaskIds = [...destColumn.taskIds]

      // Xóa task từ column nguồn
      sourceTaskIds.splice(sourceTaskIds.indexOf(activeId), 1)

      // Thêm task vào column đích
      const overIndex = destTaskIds.indexOf(overId)
      if (overIndex >= 0) {
        destTaskIds.splice(overIndex, 0, activeId)
      } else {
        destTaskIds.push(activeId)
      }

      setBoardData({
        ...boardData,
        tasks: {
          ...boardData.tasks,
          [activeId]: {
            ...boardData.tasks[activeId],
            updatedAt: new Date().toISOString(),
          },
        },
        columns: {
          ...boardData.columns,
          [activeColumn.id]: {
            ...sourceColumn,
            taskIds: sourceTaskIds,
          },
          [overColumn.id]: {
            ...destColumn,
            taskIds: destTaskIds,
          },
        },
      })
    }

    setActiveId(null)
  }

  const findColumnByTaskId = (taskId) => {
    for (const columnId of boardData.columnOrder) {
      const column = boardData.columns[columnId]
      if (column.taskIds.includes(taskId)) {
        return column
      }
    }
    return null
  }

  const findColumnById = (columnId) => {
    return boardData.columns[columnId] || null
  }

  const addNewColumn = () => {
    const newColumnId = `column-${Date.now()}`
    const newColumn = {
      id: newColumnId,
      title: 'Danh Sách Mới',
      taskIds: [],
      color: '#667eea',
    }

    setBoardData({
      ...boardData,
      columns: {
        ...boardData.columns,
        [newColumnId]: newColumn,
      },
      columnOrder: [...boardData.columnOrder, newColumnId],
    })
  }

  const addNewTask = (columnId) => {
    const newTaskId = `task-${Date.now()}`
    const now = new Date().toISOString()
    const newTask = {
      id: newTaskId,
      content: 'Nhiệm vụ mới',
      createdAt: now,
      updatedAt: now,
      labels: [],
    }

    const column = boardData.columns[columnId]

    setBoardData({
      ...boardData,
      tasks: {
        ...boardData.tasks,
        [newTaskId]: newTask,
      },
      columns: {
        ...boardData.columns,
        [columnId]: {
          ...column,
          taskIds: [...column.taskIds, newTaskId],
        },
      },
    })
  }

  const deleteColumn = (columnId) => {
    const column = boardData.columns[columnId]
    
    // Xóa tất cả tasks trong column
    const newTasks = { ...boardData.tasks }
    column.taskIds.forEach(taskId => {
      delete newTasks[taskId]
    })

    // Xóa column
    const newColumns = { ...boardData.columns }
    delete newColumns[columnId]

    // Xóa column khỏi columnOrder
    const newColumnOrder = boardData.columnOrder.filter(id => id !== columnId)

    setBoardData({
      ...boardData,
      tasks: newTasks,
      columns: newColumns,
      columnOrder: newColumnOrder,
    })
  }

  const deleteTask = (taskId) => {
    // Tìm column chứa task
    const column = findColumnByTaskId(taskId)
    if (!column) return

    // Xóa task khỏi column
    const newTaskIds = column.taskIds.filter((id) => id !== taskId)

    // Xóa task khỏi danh sách tasks
    const newTasks = { ...boardData.tasks }
    delete newTasks[taskId]

    setBoardData({
      ...boardData,
      tasks: newTasks,
      columns: {
        ...boardData.columns,
        [column.id]: {
          ...column,
          taskIds: newTaskIds,
        },
      },
    })
  }

  const updateTask = (taskId, newContent) => {
    setBoardData({
      ...boardData,
      tasks: {
        ...boardData.tasks,
        [taskId]: {
          ...boardData.tasks[taskId],
          content: newContent,
          updatedAt: new Date().toISOString(),
        },
      },
    })
  }

  const updateTaskLabels = (taskId, labels) => {
    setBoardData({
      ...boardData,
      tasks: {
        ...boardData.tasks,
        [taskId]: {
          ...boardData.tasks[taskId],
          labels,
          updatedAt: new Date().toISOString(),
        },
      },
    })
  }

  const updateColumnColor = (columnId, color) => {
    setBoardData({
      ...boardData,
      columns: {
        ...boardData.columns,
        [columnId]: {
          ...boardData.columns[columnId],
          color,
        },
      },
    })
  }

  const activeTask = activeId ? boardData.tasks[activeId] : null

  return (
    <Box>
      <Paper 
        sx={{ 
          p: 2.5, 
          mb: 3, 
          bgcolor: 'rgba(255,255,255,0.95)',
          borderRadius: 3,
          boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Typography 
          variant="h4" 
          component="h2" 
          fontWeight="bold"
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {boardData.title}
        </Typography>
      </Paper>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 2,
          }}
        >
          <SortableContext items={boardData.columnOrder}>
            {boardData.columnOrder.map((columnId) => {
              const column = boardData.columns[columnId]
              const tasks = column.taskIds.map((taskId) => boardData.tasks[taskId])

              return (
                <Column
                  key={column.id}
                  column={column}
                  tasks={tasks}
                  onAddTask={addNewTask}
                  onDeleteTask={deleteTask}
                  onUpdateTask={updateTask}
                  onUpdateTaskLabels={updateTaskLabels}
                  onUpdateColumnColor={updateColumnColor}
                  onDeleteColumn={deleteColumn}
                />
              )
            })}
          </SortableContext>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={addNewColumn}
            sx={{
              minWidth: 300,
              height: 'fit-content',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              color: 'white',
              fontWeight: 600,
              borderRadius: 3,
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                background: 'rgba(255,255,255,0.3)',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
              },
            }}
          >
            Thêm Danh Sách
          </Button>
        </Box>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} isDragging /> : null}
        </DragOverlay>
      </DndContext>
    </Box>
  )
}

export default Board

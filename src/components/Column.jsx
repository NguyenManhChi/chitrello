import { Box, Typography, Paper, Button, IconButton, Menu, MenuItem } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import PaletteIcon from '@mui/icons-material/Palette'
import { useState } from 'react'
import TaskCard from './TaskCard'
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { labelColors } from '../data/initialData'

function Column({ column, tasks, onAddTask, onDeleteTask, onUpdateTask, onUpdateTaskLabels, onUpdateColumnColor, onDeleteColumn }) {
  const [colorMenuAnchor, setColorMenuAnchor] = useState(null)
  
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  const columnColors = [
    { name: 'Xanh lá', color: '#61bd4f' },
    { name: 'Vàng', color: '#f2d600' },
    { name: 'Cam', color: '#ff9f1a' },
    { name: 'Đỏ', color: '#eb5a46' },
    { name: 'Tím', color: '#c377e0' },
    { name: 'Xanh dương', color: '#0079bf' },
    { name: 'Hồng', color: '#ff78cb' },
    { name: 'Xám', color: '#b3bac5' },
  ]

  return (
    <Paper
      sx={{
        minWidth: 300,
        maxWidth: 300,
        bgcolor: 'rgba(255,255,255,0.95)',
        p: 2,
        borderRadius: 3,
        maxHeight: 'calc(100vh - 200px)',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
        backdropFilter: 'blur(10px)',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        borderTop: 4,
        borderColor: column.color || '#667eea',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography 
          variant="h6" 
          sx={{ 
            fontWeight: 'bold',
            color: column.color || '#667eea',
          }}
        >
          {column.title}
          <Typography 
            component="span" 
            variant="body2" 
            sx={{ 
              ml: 1,
              color: column.color || '#667eea',
              fontWeight: 600,
            }}
          >
            ({tasks.length})
          </Typography>
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton
            size="small"
            onClick={(e) => setColorMenuAnchor(e.currentTarget)}
            sx={{
              opacity: 0.7,
              '&:hover': { opacity: 1 }
            }}
          >
            <PaletteIcon fontSize="small" />
          </IconButton>
          <IconButton
            size="small"
            color="error"
            onClick={() => {
              if (window.confirm(`Bạn có chắc muốn xóa cột "${column.title}" và tất cả ${tasks.length} nhiệm vụ bên trong?`)) {
                onDeleteColumn(column.id)
              }
            }}
            sx={{
              opacity: 0.6,
              '&:hover': { opacity: 1 }
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>

      <Menu
        anchorEl={colorMenuAnchor}
        open={Boolean(colorMenuAnchor)}
        onClose={() => setColorMenuAnchor(null)}
      >
        {columnColors.map((colorOption) => (
          <MenuItem
            key={colorOption.color}
            onClick={() => {
              onUpdateColumnColor(column.id, colorOption.color)
              setColorMenuAnchor(null)
            }}
            sx={{ display: 'flex', gap: 1, alignItems: 'center' }}
          >
            <Box
              sx={{
                width: 24,
                height: 24,
                bgcolor: colorOption.color,
                borderRadius: 1,
                border: column.color === colorOption.color ? '2px solid black' : '1px solid #ddd',
              }}
            />
            {colorOption.name}
          </MenuItem>
        ))}
      </Menu>

      <Box
        ref={setNodeRef}
        sx={{
          flex: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
          mb: 1,
        }}
      >
        <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDeleteTask}
              onUpdate={onUpdateTask}
              onUpdateLabels={onUpdateTaskLabels}
            />
          ))}
        </SortableContext>
      </Box>

      <Button
        variant="text"
        startIcon={<AddIcon />}
        onClick={() => onAddTask(column.id)}
        fullWidth
        sx={{
          justifyContent: 'flex-start',
          color: 'primary.main',
          fontWeight: 600,
          '&:hover': {
            bgcolor: 'rgba(102, 126, 234, 0.1)',
          },
        }}
      >
        Thêm Thẻ
      </Button>
    </Paper>
  )
}

export default Column

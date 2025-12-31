import { useState } from 'react'
import { Card, CardContent, Typography, IconButton, TextField, Box, Chip, Menu, MenuItem, Checkbox, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import CloseIcon from '@mui/icons-material/Close'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import UpdateIcon from '@mui/icons-material/Update'
import LabelIcon from '@mui/icons-material/Label'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { labelColors } from '../data/initialData'

function TaskCard({ task, onDelete, onUpdate, onUpdateLabels, isDragging }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editContent, setEditContent] = useState(task.content)
  const [labelMenuAnchor, setLabelMenuAnchor] = useState(null)

  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    const day = date.getDate().toString().padStart(2, '0')
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const year = date.getFullYear()
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isSortableDragging ? 0.5 : 1,
  }

  const handleSave = () => {
    if (editContent.trim()) {
      onUpdate(task.id, editContent.trim())
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditContent(task.content)
    setIsEditing(false)
  }

  const toggleLabel = (labelId) => {
    const currentLabels = task.labels || []
    const newLabels = currentLabels.includes(labelId)
      ? currentLabels.filter(id => id !== labelId)
      : [...currentLabels, labelId]
    onUpdateLabels(task.id, newLabels)
  }

  const getLabelColor = (labelId) => {
    const label = labelColors.find(l => l.id === labelId)
    return label ? label.color : '#ccc'
  }

  if (isDragging) {
    return (
      <Card
        sx={{
          bgcolor: 'white',
          boxShadow: 8,
          cursor: 'grabbing',
          transform: 'rotate(3deg)',
          borderLeft: 4,
          borderColor: 'primary.main',
        }}
      >
        <CardContent>
          <Typography>{task.content}</Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      sx={{
        cursor: isEditing ? 'default' : 'grab',
        bgcolor: 'white',
        borderLeft: 4,
        borderColor: 'primary.main',
        transition: 'all 0.3s ease',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
        '&:hover .task-actions': {
          opacity: 1,
        },
      }}
    >
      <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
        {isEditing ? (
          <Box>
            <TextField
              fullWidth
              multiline
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              autoFocus
              size="small"
              sx={{ mb: 1 }}
              onPointerDown={(e) => e.stopPropagation()}
            />
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                color="primary"
                onClick={handleSave}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <CheckIcon fontSize="small" />
              </IconButton>
              <IconButton
                size="small"
                onClick={handleCancel}
                onPointerDown={(e) => e.stopPropagation()}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>
        ) : (
          <Box>
            {/* Labels */}
            {task.labels && task.labels.length > 0 && (
              <Box sx={{ display: 'flex', gap: 0.5, mb: 1, flexWrap: 'wrap' }}>
                {task.labels.map((labelId) => (
                  <Box
                    key={labelId}
                    sx={{
                      width: 40,
                      height: 8,
                      borderRadius: 4,
                      bgcolor: getLabelColor(labelId),
                    }}
                  />
                ))}
              </Box>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
              <Typography variant="body2" sx={{ flex: 1, wordBreak: 'break-word', fontWeight: 500 }}>
                {task.content}
              </Typography>
              <Box
                className="task-actions"
                sx={{
                  display: 'flex',
                  gap: 0.5,
                  opacity: 0,
                  transition: 'opacity 0.2s',
                }}
              >
                <IconButton
                  size="small"
                  onClick={(e) => {
                    setLabelMenuAnchor(e.currentTarget)
                    e.stopPropagation()
                  }}
                  onPointerDown={(e) => e.stopPropagation()}
                  sx={{
                    '&:hover': { bgcolor: 'secondary.light', color: 'white' }
                  }}
                >
                  <LabelIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  onClick={() => setIsEditing(true)}
                  onPointerDown={(e) => e.stopPropagation()}
                  sx={{
                    '&:hover': { bgcolor: 'primary.light', color: 'white' }
                  }}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => onDelete(task.id)}
                  onPointerDown={(e) => e.stopPropagation()}
                  sx={{
                    '&:hover': { bgcolor: 'error.main', color: 'white' }
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
            
            {/* Hiển thị ngày tạo và cập nhật */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, mt: 1 }}>
              {task.createdAt && (
                <Chip
                  icon={<AccessTimeIcon />}
                  label={`Tạo: ${formatDate(task.createdAt)}`}
                  size="small"
                  variant="outlined"
                  sx={{ 
                    fontSize: '0.7rem',
                    height: 24,
                    '& .MuiChip-icon': { fontSize: '0.9rem' }
                  }}
                />
              )}
              {task.updatedAt && task.updatedAt !== task.createdAt && (
                <Chip
                  icon={<UpdateIcon />}
                  label={`Sửa: ${formatDate(task.updatedAt)}`}
                  size="small"
                  variant="outlined"
                  color="secondary"
                  sx={{ 
                    fontSize: '0.7rem',
                    height: 24,
                    '& .MuiChip-icon': { fontSize: '0.9rem' }
                  }}
                />
              )}
            </Box>
          </Box>
        )}
      </CardContent>

      {/* Label Menu */}
      <Menu
        anchorEl={labelMenuAnchor}
        open={Boolean(labelMenuAnchor)}
        onClose={() => setLabelMenuAnchor(null)}
        onClick={(e) => e.stopPropagation()}
      >
        {labelColors.map((label) => (
          <MenuItem
            key={label.id}
            onClick={(e) => {
              toggleLabel(label.id)
              e.stopPropagation()
            }}
            sx={{ display: 'flex', gap: 1 }}
          >
            <Checkbox
              checked={task.labels?.includes(label.id) || false}
              size="small"
            />
            <Box
              sx={{
                width: 40,
                height: 20,
                bgcolor: label.color,
                borderRadius: 1,
              }}
            />
            <ListItemText primary={label.name} />
          </MenuItem>
        ))}
      </Menu>
    </Card>
  )
}

export default TaskCard

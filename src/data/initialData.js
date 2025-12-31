const now = new Date().toISOString()

// Available label colors
export const labelColors = [
  { id: 'green', name: 'Xanh lá', color: '#61bd4f' },
  { id: 'yellow', name: 'Vàng', color: '#f2d600' },
  { id: 'orange', name: 'Cam', color: '#ff9f1a' },
  { id: 'red', name: 'Đỏ', color: '#eb5a46' },
  { id: 'purple', name: 'Tím', color: '#c377e0' },
  { id: 'blue', name: 'Xanh dương', color: '#0079bf' },
  { id: 'sky', name: 'Xanh da trời', color: '#00c2e0' },
  { id: 'lime', name: 'Xanh chanh', color: '#51e898' },
  { id: 'pink', name: 'Hồng', color: '#ff78cb' },
  { id: 'black', name: 'Đen', color: '#344563' },
]

export const initialData = {
  title: 'Bảng Dự Án',
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'Cần Làm',
      taskIds: ['task-1', 'task-2', 'task-3'],
      color: '#61bd4f',
    },
    'column-2': {
      id: 'column-2',
      title: 'Đang Làm',
      taskIds: ['task-4'],
      color: '#f2d600',
    },
    'column-3': {
      id: 'column-3',
      title: 'Hoàn Thành',
      taskIds: ['task-5', 'task-6'],
      color: '#0079bf',
    },
  },
  tasks: {
    'task-1': { 
      id: 'task-1', 
      content: 'Thiết kế giao diện người dùng',
      createdAt: now,
      updatedAt: now,
      labels: ['red', 'purple']
    },
    'task-2': { 
      id: 'task-2', 
      content: 'Tạo component React',
      createdAt: now,
      updatedAt: now,
      labels: ['blue']
    },
    'task-3': { 
      id: 'task-3', 
      content: 'Viết tài liệu API',
      createdAt: now,
      updatedAt: now,
      labels: ['green']
    },
    'task-4': { 
      id: 'task-4', 
      content: 'Tích hợp drag and drop',
      createdAt: now,
      updatedAt: now,
      labels: ['yellow', 'orange']
    },
    'task-5': { 
      id: 'task-5', 
      content: 'Thiết lập dự án',
      createdAt: now,
      updatedAt: now,
      labels: ['green']
    },
    'task-6': { 
      id: 'task-6', 
      content: 'Cài đặt dependencies',
      createdAt: now,
      updatedAt: now,
      labels: ['green']
    },
  },
  columnOrder: ['column-1', 'column-2', 'column-3'],
}

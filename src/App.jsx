import { useState, useEffect } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { Box, Container } from '@mui/material'
import Header from './components/Header'
import Board from './components/Board'
import { initialData } from './data/initialData'

const theme = createTheme({
  palette: {
    primary: {
      main: '#0079bf',
      light: '#42a5f5',
      dark: '#005a8f',
    },
    secondary: {
      main: '#5aac44',
      light: '#81c784',
      dark: '#388e3c',
    },
    background: {
      default: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      paper: '#ffffff',
    },
    success: {
      main: '#4caf50',
    },
    warning: {
      main: '#ff9800',
    },
    error: {
      main: '#f44336',
    },
  },
  typography: {
    fontFamily: '"Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  shape: {
    borderRadius: 8,
  },
})

function App() {
  const [boardData, setBoardData] = useState(() => {
    // Load data từ localStorage
    const savedData = localStorage.getItem('trelloAppData')
    if (savedData) {
      try {
        return JSON.parse(savedData)
      } catch (error) {
        console.error('Error loading data from localStorage:', error)
        return initialData
      }
    }
    return initialData
  })

  // Lưu data vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem('trelloAppData', JSON.stringify(boardData))
  }, [boardData])

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundAttachment: 'fixed',
        }}
      >
        <Header />
        <Container maxWidth="xl" sx={{ mt: 3 }}>
          <Board boardData={boardData} setBoardData={setBoardData} />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App

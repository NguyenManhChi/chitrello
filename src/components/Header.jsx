import { AppBar, Toolbar, Typography, Box } from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'

function Header() {
  return (
    <AppBar 
      position="static" 
      elevation={0}
      sx={{
        background: 'rgba(255,255,255,0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.2)',
      }}
    >
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <DashboardIcon sx={{ fontSize: 32 }} />
          <Typography 
            variant="h5" 
            component="h1" 
            fontWeight="bold"
            sx={{
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            }}
          >
            Trello Task Manager
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Header

import { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from './store/store';
import { initializeAuth } from './features/authentication/authSlice';
import AppRoutes from './routes/AppRoutes';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0da6f2' },
    background: { default: '#0b1114', paper: '#11191d' },
  },
  typography: { fontFamily: "'Plus Jakarta Sans', sans-serif" },
});

function App() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Box sx={{
          backgroundColor: 'var(--bg-dark)',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}>
          <ToastContainer position="bottom-right" theme="dark" />

          <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <AppRoutes />
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
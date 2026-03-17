import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch, RootState } from './store/store';
import { initializeAuth } from './features/authentication/authSlice';
import { router } from './routes/AppRoutes';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0da6f2' },
    background: { default: '#0b1114', paper: '#11191d' },
  },
  typography: { fontFamily: "'Plus Jakarta Sans', sans-serif" },
});

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { isInitialized } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  if (!isInitialized) {

    return (
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        bgcolor: '#0b1114'
      }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{
        backgroundColor: 'var(--bg-dark)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <ToastContainer position="bottom-right" theme="dark" />

        <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <RouterProvider router={router} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
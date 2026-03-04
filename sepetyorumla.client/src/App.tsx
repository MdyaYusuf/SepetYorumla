import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import type { RootState } from './store/store';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
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
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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

          {!isAuthenticated && <Navbar />}

          <Box component="main" sx={{ flexGrow: 1 }}>
            <AppRoutes />
          </Box>

          {!isAuthenticated && <Footer />}
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
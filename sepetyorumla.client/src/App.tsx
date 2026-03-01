import { BrowserRouter as Router } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline, Box } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <Navbar />

          <Box component="main" sx={{ flexGrow: 1 }}>
            <AppRoutes />
          </Box>

          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
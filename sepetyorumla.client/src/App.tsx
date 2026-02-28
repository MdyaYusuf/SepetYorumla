import Navbar from './components/layout/Navbar';
import Hero from './components/layout/Hero';
import FeaturedBaskets from './components/layout/FeaturedBaskets';
import HowItWorks from './components/layout/HowItWorks';
import Footer from './components/layout/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0da6f2',
    },
    background: {
      default: '#0b1114',
      paper: '#11191d',
    },
  },
  typography: {
    fontFamily: "'Plus Jakarta Sans', sans-serif",
  },
});

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh' }}>
        <ToastContainer position="bottom-right" theme="dark" />
        <Navbar />
        <main>
          <Hero />
          <FeaturedBaskets />
          <HowItWorks />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;
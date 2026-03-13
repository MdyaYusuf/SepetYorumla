import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {

    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);

      return;
    }

    const element = document.getElementById(sectionId);

    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        bgcolor: 'var(--bg-dark)',
        borderBottom: '1px solid var(--border-dark)',
        boxShadow: 'none',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 0 } }}>

          <Box
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              textDecoration: 'none',
              '&:active': { color: 'var(--primary)', opacity: 1 },
              '&:visited': { color: 'var(--primary)' }
            }}
          >
            <Box
              sx={{
                bgcolor: 'rgba(13, 166, 242, 0.15)',
                p: 0.8,
                borderRadius: '10px',
                display: 'flex',
                border: '1px solid rgba(13, 166, 242, 0.3)',
                transition: 'all 0.3s ease',
                '&:hover': { boxShadow: '0 0 15px rgba(13, 166, 242, 0.4)' }
              }}
            >
              <ShoppingBasketIcon sx={{ color: 'var(--primary)', fontSize: 28 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: 'var(--primary)',
                opacity: 0.85,
                letterSpacing: '-0.5px',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                transition: 'all 0.3s ease-in-out',
                '&:hover': {
                  opacity: 1,
                  color: 'var(--primary)',
                  textShadow: '0 0 12px rgba(13, 166, 242, 0.6), 0 0 20px rgba(13, 166, 242, 0.2)'
                }
              }}
            >
              SepetYorumla
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <Button
              sx={navButtonStyle}
              onClick={() => scrollToSection('featured-baskets')}
            >
              Keşfet
            </Button>

            <Button
              sx={navButtonStyle}
              onClick={() => scrollToSection('how-it-works')}
            >
              Nasıl Çalışır?
            </Button>

            <Button
              component={RouterLink}
              to="/about"
              sx={navButtonStyle}
            >
              Hakkımızda
            </Button>

            <Box sx={{ width: '1px', height: '20px', bgcolor: 'var(--border-dark)', mx: 2 }} />

            <Button
              component={RouterLink}
              to="/register"
              variant="outlined"
              sx={{
                color: 'var(--text-white)',
                borderColor: 'var(--border-dark)',
                borderRadius: '24px',
                px: 3,
                py: 0.8,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                mr: 1,
                '&:hover': {
                  borderColor: 'var(--text-muted)',
                  bgcolor: 'rgba(255, 255, 255, 0.05)'
                }
              }}
            >
              Kayıt Ol
            </Button>

            <Button
              component={RouterLink}
              to="/login"
              variant="contained"
              sx={{
                bgcolor: 'var(--primary)',
                color: '#fff',
                borderRadius: '24px',
                px: 3,
                py: 0.8,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '0.95rem',
                '&:hover': { bgcolor: '#0b8ed1' },
                boxShadow: '0 4px 14px 0 rgba(13, 166, 242, 0.39)'
              }}
            >
              Giriş Yap
            </Button>
          </Box>

          <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: 'var(--text-white)' }}>
            <MenuIcon />
          </IconButton>

        </Toolbar>
      </Container>
    </AppBar>
  );
};

const navButtonStyle = {
  color: 'var(--text-muted)',
  textTransform: 'none',
  fontWeight: 600,
  fontSize: '0.95rem',
  px: 2,
  '&:hover': { color: 'var(--text-white)', bgcolor: 'transparent' }
};

export default Navbar;
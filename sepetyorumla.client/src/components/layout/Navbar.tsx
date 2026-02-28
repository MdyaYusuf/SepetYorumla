import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, IconButton } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar: React.FC = () => {
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

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, cursor: 'pointer' }}>
            <Box
              sx={{
                bgcolor: 'rgba(13, 166, 242, 0.15)',
                p: 0.8,
                borderRadius: '10px',
                display: 'flex',
                border: '1px solid rgba(13, 166, 242, 0.3)'
              }}
            >
              <ShoppingBasketIcon sx={{ color: 'var(--primary)', fontSize: 28 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: 'var(--text-white)',
                letterSpacing: '-0.5px',
                fontFamily: "'Plus Jakarta Sans', sans-serif"
              }}
            >
              SepetYorumla
            </Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <Button sx={navButtonStyle}>Keşfet</Button>
            <Button sx={navButtonStyle}>Topluluk</Button>
            <Button sx={navButtonStyle}>Nasıl Çalışır?</Button>

            <Box sx={{ width: '1px', height: '20px', bgcolor: 'var(--border-dark)', mx: 2 }} />

            <Button
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
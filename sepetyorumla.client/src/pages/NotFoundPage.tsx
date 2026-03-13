import React from 'react';
import { Box, Typography, Button, Container, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../store/store';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import HomeIcon from '@mui/icons-material/Home';
import ForumIcon from '@mui/icons-material/Forum';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        bgcolor: 'var(--bg-dark)',
        color: 'var(--text-white)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '500px',
          height: '500px',
          bgcolor: 'rgba(13, 166, 242, 0.1)',
          borderRadius: '50%',
          filter: 'blur(120px)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <Container
        maxWidth="md"
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box sx={{ position: 'relative', mb: 6 }}>
          <Typography
            sx={{
              fontSize: { xs: '120px', md: '180px' },
              fontWeight: 900,
              color: 'rgba(255, 255, 255, 0.05)',
              lineHeight: 1,
              userSelect: 'none',
              letterSpacing: '-10px'
            }}
          >
            404
          </Typography>

          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%) rotate(12deg)',
              bgcolor: 'var(--surface-dark)',
              p: 4,
              borderRadius: '24px',
              border: '1px solid var(--border-dark)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
              display: 'flex'
            }}
          >
            <ShoppingBasketIcon
              sx={{
                fontSize: 80,
                color: 'var(--primary)',
                filter: 'drop-shadow(0 0 15px rgba(13, 166, 242, 0.5))'
              }}
            />
          </Box>
        </Box>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' }
          }}
        >
          Aradığınıza Ulaşılamadı!
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'var(--text-muted)',
            mb: 6,
            maxWidth: '500px',
            fontSize: '1.1rem'
          }}
        >
          Görünüşe göre sayfa başka bir diyara taşınmış.
        </Typography>

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
          sx={{ width: '100%', maxWidth: '500px' }}
        >
          {isAuthenticated && (
            <Button
              variant="outlined"
              size="large"
              startIcon={<ForumIcon />}
              onClick={() => navigate('/home')}
              sx={{
                flex: 1,
                color: 'var(--text-white)',
                borderColor: 'var(--border-dark)',
                borderRadius: '16px',
                px: 4,
                py: 1.8,
                fontSize: '1rem',
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': {
                  borderColor: 'var(--primary)',
                  bgcolor: 'rgba(13, 166, 242, 0.05)',
                  transform: 'translateY(-2px)'
                },
                transition: 'all 0.2s ease'
              }}
            >
              Akışa Dön
            </Button>
          )}

          <Button
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
            onClick={() => navigate('/')}
            sx={{
              flex: 1,
              bgcolor: 'var(--primary)',
              color: '#fff',
              borderRadius: '16px',
              px: 4,
              py: 1.8,
              fontSize: '1rem',
              fontWeight: 800,
              textTransform: 'none',
              '&:hover': {
                bgcolor: '#0b8ed1',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.2s ease',
              boxShadow: '0 8px 24px rgba(13, 166, 242, 0.3)'
            }}
          >
            Ana Sayfaya Dön
          </Button>
        </Stack>
      </Container>

      <Box
        sx={{
          py: 4,
          textAlign: 'center',
          borderTop: '1px solid var(--border-dark)',
          bgcolor: 'rgba(255, 255, 255, 0.02)'
        }}
      >
        <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
          © {new Date().getFullYear()} SepetYorumla. Tüm hakları saklıdır.
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFoundPage;
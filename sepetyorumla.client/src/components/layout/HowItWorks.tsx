import React from 'react';
import { Box, Container, Typography, Grid, Stack, Button } from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import ForumIcon from '@mui/icons-material/Forum';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const steps = [
  {
    icon: <ShareIcon sx={{ fontSize: 40, color: 'var(--primary)' }} />,
    title: 'Sepetini Paylaş',
    description: 'Hazırladığın alışveriş sepetini tek tıkla toplulukla paylaş.'
  },
  {
    icon: <ForumIcon sx={{ fontSize: 40, color: 'var(--primary)' }} />,
    title: 'Geri Bildirim Al',
    description: 'Diğer kullanıcılar ürünlerin kalitesi ve fiyatı hakkında yorum yapsın.'
  },
  {
    icon: <CheckCircleIcon sx={{ fontSize: 40, color: 'var(--primary)' }} />,
    title: 'Bilinçli Alışveriş',
    description: 'Gelen yorumlara göre sepetini güncelle ve bütçeni koru.'
  }
];

const HowItWorks: React.FC = () => {
  return (
    <Box
      id="how-it-works"
      sx={{
        pt: 15,
        pb: 8,
        background: 'radial-gradient(circle at 50% 120%, #1e3a4a 0%, var(--bg-dark) 75%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ color: 'var(--text-white)', fontWeight: 800, mb: 10 }}
        >
          Nasıl Çalışır?
        </Typography>

        <Grid container spacing={6}>
          {steps.map((step, index) => (
            <Grid key={index} size={{ xs: 12, md: 4 }}>
              <Stack alignItems="center" spacing={3} textAlign="center">
                <Box
                  sx={{
                    width: 84,
                    height: 84,
                    borderRadius: '24px',
                    bgcolor: 'rgba(13, 166, 242, 0.03)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(13, 166, 242, 0.15)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px) rotate(5deg)',
                      borderColor: 'var(--primary)',
                      boxShadow: '0 10px 30px rgba(13, 166, 242, 0.2)'
                    }
                  }}
                >
                  {step.icon}
                </Box>
                <Typography variant="h6" sx={{ color: 'var(--text-white)', fontWeight: 700 }}>
                  {step.title}
                </Typography>
                <Typography sx={{ color: 'var(--text-muted)', lineHeight: 1.7, px: 2 }}>
                  {step.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 10, textAlign: 'center' }}>
          <Button
            variant="outlined"
            sx={{
              color: 'var(--text-white)',
              borderColor: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              px: 5,
              py: 1,
              textTransform: 'none',
              fontWeight: 800,
              fontSize: '1rem',
              transition: 'all 0.3s ease',
              '&:hover': {
                borderColor: 'var(--primary)',
                bgcolor: 'rgba(13, 166, 242, 0.05)',
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 25px rgba(13, 166, 242, 0.15)'
              }
            }}
          >
            Detaylı Bilgi İçin
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
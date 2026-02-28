import React from 'react';
import { Box, Container, Typography, Grid, Stack } from '@mui/material';
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
    <Box sx={{ py: 12, bgcolor: 'var(--surface-dark)', borderTop: '1px solid var(--border-dark)' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          textAlign="center"
          sx={{ color: 'var(--text-white)', fontWeight: 800, mb: 8 }}
        >
          Nasıl Çalışır?
        </Typography>

        <Grid container spacing={6}>
          {steps.map((step, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Stack alignItems="center" spacing={3} textAlign="center">
                <Box
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'rgba(13, 166, 242, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '1px solid rgba(13, 166, 242, 0.2)'
                  }}
                >
                  {step.icon}
                </Box>
                <Typography variant="h6" sx={{ color: 'var(--text-white)', fontWeight: 700 }}>
                  {step.title}
                </Typography>
                <Typography sx={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                  {step.description}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HowItWorks;
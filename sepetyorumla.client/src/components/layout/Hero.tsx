import React from 'react';
import { Box, Typography, Container, Stack } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ForumIcon from '@mui/icons-material/Forum';
import PsychologyIcon from '@mui/icons-material/Psychology';

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 1, md: 2 },
        background: 'radial-gradient(circle at 50% -20%, #1e3a4a 0%, var(--bg-dark) 70%)',
        textAlign: 'center'
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 1,
            px: 2,
            py: 0.5,
            borderRadius: '20px',
            bgcolor: 'rgba(13, 166, 242, 0.1)',
            border: '1px solid rgba(13, 166, 242, 0.2)',
            mb: 3
          }}
        >
          <ShoppingBasketIcon sx={{ color: 'var(--primary)', fontSize: 18 }} />
          <Typography variant="caption" sx={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: 1 }}>
            BİLİNÇLİ VE TASARRUFLU ALIŞVERİŞ
          </Typography>
        </Box>

        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 800,
            color: 'var(--text-white)',
            lineHeight: 1.1,
            mb: 3,
            letterSpacing: '-1px'
          }}
        >
          Alışverişini <span style={{ color: 'var(--primary)' }}>Yorumlat,</span> <br />
          Bütçeni Koru.
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'var(--text-muted)',
            fontSize: '1.1rem',
            maxWidth: '600px',
            mx: 'auto',
            mb: 6,
            lineHeight: 1.6
          }}
        >
          Sepetindeki ürünleri toplulukla paylaş, gerçek kullanıcı deneyimlerini öğren ve
          daha akıllı alışveriş kararları al.
        </Typography>

        <Stack
          direction="row"
          spacing={{ xs: 2, sm: 4 }}
          justifyContent="center"
          sx={{
            mt: 4,
            p: { xs: 2, sm: 4 },
            borderRadius: '32px',
            position: 'relative',
            overflow: 'visible'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              zIndex: -1,
              pointerEvents: 'none',
              background: `
                radial-gradient(circle at 20% 60%, rgba(13, 166, 242, 0.08) 0%, transparent 50%),
                radial-gradient(circle at 50% 40%, rgba(13, 166, 242, 0.12) 0%, transparent 60%),
                radial-gradient(circle at 80% 65%, rgba(13, 166, 242, 0.08) 0%, transparent 50%)
              `,
              filter: 'blur(35px)',
              opacity: 0.8
            }}
          />

          <ValueItem
            icon={<MonetizationOnIcon />}
            text="Bütçe Dostu"
            delay="0s"
          />
          <ValueItem
            icon={<ForumIcon />}
            text="Geri Bildirimler"
            delay="0.1s"
          />
          <ValueItem
            icon={<PsychologyIcon />}
            text="Akıllı Seçimler"
            delay="0.2s"
          />
        </Stack>
      </Container>
    </Box>
  );
};

const ValueItem = ({ icon, text, delay }: { icon: React.ReactElement<any>, text: string, delay: string }) => (
  <Stack
    alignItems="center"
    spacing={1.5}
    sx={{
      color: 'var(--text-muted)',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      animation: `fadeInUp 0.6s ease-out ${delay} both`,
      '&:hover': {
        color: 'var(--primary)',
        transform: 'translateY(-8px)',
        '& .icon-box': {
          borderColor: 'var(--primary)',
          bgcolor: 'rgba(13, 166, 242, 0.1)',
          boxShadow: '0 0 20px rgba(13, 166, 242, 0.2)'
        }
      },
      '@keyframes fadeInUp': {
        from: { opacity: 0, transform: 'translateY(20px)' },
        to: { opacity: 1, transform: 'translateY(0)' }
      }
    }}
  >
    <Box
      className="icon-box"
      sx={{
        p: { xs: 1.5, sm: 2.5 },
        bgcolor: 'var(--surface-dark)',
        borderRadius: '20px',
        border: '1px solid var(--border-dark)',
        display: 'flex',
        transition: 'all 0.3s ease'
      }}
    >
      {React.cloneElement(icon, { sx: { fontSize: { xs: 28, sm: 40 } } })}
    </Box>
    <Typography
      variant="caption"
      sx={{
        fontWeight: 800,
        fontSize: { xs: '0.65rem', sm: '0.75rem' },
        letterSpacing: '0.5px'
      }}
    >
      {text}
    </Typography>
  </Stack>
);

export default Hero;
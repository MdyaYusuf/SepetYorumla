import React from 'react';
import { Box, Typography, Container, TextField, InputAdornment, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        pt: { xs: 8, md: 12 },
        pb: { xs: 10, md: 15 },
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
          <AssessmentIcon sx={{ color: 'var(--primary)', fontSize: 18 }} />
          <Typography variant="caption" sx={{ color: 'var(--primary)', fontWeight: 700, letterSpacing: 1 }}>
            YENİ: AKILLI SEPET ANALİZİ
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

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: 2,
            p: 1,
            borderRadius: '16px',
            bgcolor: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border-dark)',
            maxWidth: '700px',
            mx: 'auto',
            boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
          }}
        >
          <TextField
            fullWidth
            placeholder="Ürün veya sepet ara..."
            variant="standard"
            slotProps={{
              input: {
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'var(--text-muted)', ml: 2 }} />
                  </InputAdornment>
                ),
                sx: { color: 'var(--text-white)', py: 1.5, px: 1 }
              }
            }}
          />
          <Button
            variant="contained"
            sx={{
              bgcolor: 'var(--primary)',
              px: 4,
              py: { xs: 1.5, sm: 0 },
              borderRadius: '12px',
              textTransform: 'none',
              fontWeight: 700,
              whiteSpace: 'nowrap'
            }}
          >
            Sepetimi Yorumla
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Hero;
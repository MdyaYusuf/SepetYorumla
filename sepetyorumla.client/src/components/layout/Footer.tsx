import React from 'react';
import { Box, Container, Typography, Grid, Link, Divider } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'var(--bg-dark)', pt: 10, pb: 4, borderTop: '1px solid var(--border-dark)' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 8 }}>

          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <ShoppingBasketIcon sx={{ color: 'var(--primary)', fontSize: 28 }} />
              <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--text-white)', letterSpacing: '-0.5px' }}>
                SepetYorumla
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '300px' }}>
              Alışveriş sepetlerini paylaşan ve yorumlayan en büyük topluluk.
              Birlikte daha bilinçli ve tasarruflu kararlar veriyoruz.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }} sx={{ ml: { md: 'auto' } }}>
            <Typography variant="subtitle2" sx={{ color: 'var(--text-white)', fontWeight: 700, mb: 3 }}>
              Platform
            </Typography>
            <FooterLink>Keşfet</FooterLink>
            <FooterLink>Topluluk</FooterLink>
            <FooterLink>Nasıl Çalışır?</FooterLink>
            <FooterLink>Trendler</FooterLink>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'var(--text-white)', fontWeight: 700, mb: 3 }}>
              Kurumsal
            </Typography>
            <FooterLink>Hakkımızda</FooterLink>
            <FooterLink>Gizlilik Politikası</FooterLink>
            <FooterLink>Kullanım Şartları</FooterLink>
            <FooterLink>İletişim</FooterLink>
          </Grid>
        </Grid>

        <Divider sx={{ borderColor: 'var(--border-dark)', mb: 4 }} />

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
            © 2026 SepetYorumla. Tüm hakları saklıdır.
          </Typography>
          <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
            Muhammed Yusuf Aydın tarafından geliştirildi.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

const FooterLink = ({ children }: { children: React.ReactNode }) => (
  <Link
    href="#"
    underline="none"
    sx={{
      display: 'block',
      color: 'var(--text-muted)',
      mb: 1.5,
      fontSize: '0.85rem',
      transition: 'color 0.2s',
      '&:hover': { color: 'var(--primary)' }
    }}
  >
    {children}
  </Link>
);

export default Footer;
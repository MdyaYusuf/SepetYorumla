import React from 'react';
import { Box, Typography, Grid, Link, Divider, Container } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: 'var(--bg-dark)', pt: 8, pb: 4, borderTop: 'none' }}>
      <Container maxWidth="xl">
        <Grid container spacing={4} sx={{ mb: 6 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 800, color: 'var(--text-white)', mb: 2 }}>
              SepetYorumla
            </Typography>
            <Typography variant="body2" sx={{ color: 'var(--text-muted)', lineHeight: 1.8, maxWidth: '350px' }}>
              Alışveriş sepetlerini paylaşan ve yorumlayan en büyük topluluk.
              Birlikte daha bilinçli ve tasarruflu kararlar veriyoruz.
            </Typography>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }} sx={{ ml: { md: 'auto' } }}>
            <Typography variant="subtitle2" sx={{ color: 'var(--text-white)', fontWeight: 700, mb: 3 }}>
              Platform
            </Typography>
            <FooterLink component={RouterLink} to="/intro">
              Tanıtım
            </FooterLink>
          </Grid>

          <Grid size={{ xs: 6, md: 2 }}>
            <Typography variant="subtitle2" sx={{ color: 'var(--text-white)', fontWeight: 700, mb: 3 }}>
              Kurumsal
            </Typography>
            <FooterLink component={RouterLink} to="/about">
              Hakkımızda
            </FooterLink>
            <FooterLink component={RouterLink} to="/legal">
              Kullanım Şartları
            </FooterLink>
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

interface FooterLinkProps {
  children: React.ReactNode;
  component?: any;
  to?: string;
}

const FooterLink = ({ children, component, to }: FooterLinkProps) => (
  <Link
    component={component}
    to={to}
    underline="none"
    sx={{
      display: 'block',
      color: 'var(--text-muted)',
      mb: 1.5,
      fontSize: '0.85rem',
      cursor: 'pointer',
      transition: 'color 0.2s',
      '&:hover': { color: 'var(--primary)' }
    }}
  >
    {children}
  </Link>
);

export default Footer;
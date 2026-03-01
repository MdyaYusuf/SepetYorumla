import React from 'react';
import {
  Box, Typography, TextField, Button, Link, Paper,
  InputAdornment, IconButton, Checkbox, FormControlLabel, Stack, Grid, Container
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LockResetIcon from '@mui/icons-material/LockReset';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ReviewsIcon from '@mui/icons-material/Reviews';

const Register: React.FC = () => {
  return (
    <Box sx={{
      minHeight: 'calc(100vh - 70px)',
      bgcolor: 'var(--bg-dark)',
      display: 'flex',
      alignItems: 'center',
      py: { xs: 4, md: 8 }
    }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ alignItems: 'center' }}>

          <Grid size={{ xs: 0, lg: 5.5 }} sx={{
            display: { xs: 'none', lg: 'flex' },
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
          }}>
            <Stack spacing={4} sx={{ position: 'relative', zIndex: 1, maxWidth: 480 }}>
              <Box sx={{
                display: 'flex', width: 56, height: 56, bgcolor: 'rgba(13, 166, 242, 0.1)',
                borderRadius: 3, alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(13, 166, 242, 0.2)'
              }}>
                <ReviewsIcon sx={{ color: 'var(--primary)', fontSize: 32 }} />
              </Box>

              <Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: 'var(--text-white)', lineHeight: 1.2, mb: 2 }}>
                  Sepetini Paylaş,<br />
                  <Box component="span" sx={{ color: 'var(--primary)' }}>Yorumları Al</Box>
                </Typography>
                <Typography variant="body1" sx={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.6 }}>
                  Alışveriş listelerini toplulukla paylaş, en iyi fırsatları yakala ve diğer kullanıcıların deneyimleriyle tasarruf et.
                </Typography>
              </Box>

              <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                <Box component="span" sx={{ color: 'var(--text-white)', fontWeight: 700 }}>2.000+</Box> mutlu kullanıcı
              </Typography>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, lg: 6.5 }} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Paper elevation={0} sx={{
              width: '100%', maxWidth: 460, bgcolor: 'var(--surface-dark)',
              border: '1px solid var(--border-dark)', borderRadius: '28px', p: { xs: 4, sm: 6 },
              boxShadow: '0 24px 48px rgba(0,0,0,0.4)'
            }}>
              <Box mb={4}>
                <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--text-white)', mb: 1 }}>Hesap Oluştur</Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>Ücretsiz kaydol ve hemen başla.</Typography>
              </Box>

              <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box>
                  <Typography variant="caption" sx={labelStyle}>Ad Soyad</Typography>
                  <TextField fullWidth placeholder="Adınız ve Soyadınız" slotProps={{ input: { startAdornment: (<InputAdornment position="start"><PersonOutlineIcon sx={{ color: 'var(--text-muted)' }} /></InputAdornment>), sx: inputStyles } }} />
                </Box>

                <Box>
                  <Typography variant="caption" sx={labelStyle}>E-posta</Typography>
                  <TextField fullWidth placeholder="ornek@eposta.com" slotProps={{ input: { startAdornment: (<InputAdornment position="start"><MailOutlineIcon sx={{ color: 'var(--text-muted)' }} /></InputAdornment>), sx: inputStyles } }} />
                </Box>

                <Box>
                  <Typography variant="caption" sx={labelStyle}>Şifre</Typography>
                  <TextField fullWidth type="password" placeholder="••••••••" slotProps={{
                    input: {
                      startAdornment: (<InputAdornment position="start"><LockOutlinedIcon sx={{ color: 'var(--text-muted)' }} /></InputAdornment>),
                      endAdornment: (<InputAdornment position="end"><IconButton size="small"><VisibilityOffIcon sx={{ color: 'var(--text-muted)', fontSize: 20 }} /></IconButton></InputAdornment>),
                      sx: inputStyles
                    }
                  }} />
                  <Box sx={{ display: 'flex', gap: 0.8, mt: 1 }}>
                    {[1, 2, 3, 4].map((i) => (
                      <Box key={i} sx={{ flex: 1, height: 4, borderRadius: 1, bgcolor: i <= 2 ? 'var(--primary)' : 'rgba(255,255,255,0.05)' }} />
                    ))}
                  </Box>
                </Box>

                <Box>
                  <Typography variant="caption" sx={labelStyle}>Şifre Tekrar</Typography>
                  <TextField fullWidth type="password" placeholder="••••••••" slotProps={{ input: { startAdornment: (<InputAdornment position="start"><LockResetIcon sx={{ color: 'var(--text-muted)' }} /></InputAdornment>), sx: inputStyles } }} />
                </Box>

                <FormControlLabel
                  control={<Checkbox sx={{ color: 'var(--border-dark)', '&.Mui-checked': { color: 'var(--primary)' } }} />}
                  label={
                    <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
                      <Link href="#" sx={{ color: 'var(--primary)', fontWeight: 700, textDecoration: 'none' }}>Kullanım Koşulları</Link>'nı kabul ediyorum.
                    </Typography>
                  }
                />

                <Button variant="contained" fullWidth endIcon={<ArrowForwardIcon />} sx={{
                  bgcolor: 'var(--primary)', py: 1.8, borderRadius: '14px', fontWeight: 800, textTransform: 'none',
                  boxShadow: '0 8px 24px rgba(13, 166, 242, 0.3)', '&:hover': { bgcolor: '#0b8ed1' }
                }}>
                  Kayıt Ol
                </Button>

                <Typography variant="body2" textAlign="center" sx={{ color: 'var(--text-muted)', mt: 1 }}>
                  Zaten hesabın var mı? {' '}
                  <Link component={RouterLink} to="/login" sx={{ color: 'var(--primary)', fontWeight: 800, textDecoration: 'none' }}>
                    Giriş Yap
                  </Link>
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const labelStyle = { color: 'var(--text-white)', fontWeight: 600, ml: 1, mb: 0.8, display: 'block' };
const inputStyles = {
  bgcolor: 'rgba(255, 255, 255, 0.03)', borderRadius: '14px', color: 'var(--text-white)',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-dark)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' },
};

export default Register;
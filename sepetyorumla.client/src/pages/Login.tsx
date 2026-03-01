import React from 'react';
import {
  Box, Typography, TextField, Button,
  Link, Paper, InputAdornment, IconButton
} from '@mui/material';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Login: React.FC = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 50%, #1e3a4a 0%, var(--bg-dark) 100%)',
        p: 2
      }}
    >
      <Paper
        elevation={0}
        sx={{
          width: '100%',
          maxWidth: 480,
          bgcolor: 'var(--surface-dark)',
          border: '1px solid var(--border-dark)',
          borderRadius: '24px',
          p: { xs: 4, sm: 6 }
        }}
      >
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--text-white)', mb: 1 }}>
            Tekrar Hoşgeldin!
          </Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
            Sepetindeki ürünleri yorumlamaya devam et.
          </Typography>
        </Box>

        <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--text-white)', fontWeight: 600, ml: 1, mb: 1, display: 'block' }}>
              E-posta
            </Typography>
            <TextField
              fullWidth
              placeholder="ornek@mail.com"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <MailOutlineIcon sx={{ color: 'var(--text-muted)' }} />
                    </InputAdornment>
                  ),
                  sx: inputStyles
                }
              }}
              variant="outlined"
            />
          </Box>

          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" px={1} mb={1}>
              <Typography variant="caption" sx={{ color: 'var(--text-white)', fontWeight: 600 }}>
                Şifre
              </Typography>
              <Link href="#" underline="none" sx={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.7rem' }}>
                Şifreni mi unuttun?
              </Link>
            </Box>
            <TextField
              fullWidth
              type="password"
              placeholder="••••••••"
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOutlinedIcon sx={{ color: 'var(--text-muted)' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton size="small">
                        <VisibilityOffIcon sx={{ color: 'var(--text-muted)', fontSize: 20 }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  sx: inputStyles
                }
              }}
              variant="outlined"
            />
          </Box>

          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: 'var(--primary)',
              mt: 2,
              py: 1.8,
              borderRadius: '12px',
              fontWeight: 800,
              textTransform: 'none',
              fontSize: '1rem',
              boxShadow: '0 8px 20px rgba(13, 166, 242, 0.3)',
              mb: 4,
              '&:hover': { bgcolor: '#0b8ed1' }
            }}
          >
            Giriş Yap
          </Button>
        </Box>

        <Typography variant="body2" textAlign="center" sx={{ color: 'var(--text-muted)' }}>
          Hesabınız yok mu? {' '}
          <Link href="#" underline="none" sx={{ color: 'var(--primary)', fontWeight: 800 }}>
            Kayıt Ol
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
};

const inputStyles = {
  bgcolor: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '12px',
  color: 'var(--text-white)',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-dark)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' },
};

export default Login;
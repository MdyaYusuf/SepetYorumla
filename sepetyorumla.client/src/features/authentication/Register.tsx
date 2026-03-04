import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { requests } from '../../api/axiosInstance';
import type { CreatedUserResponseDto, RegisterRequest } from '../../models/User';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Register = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterRequest>({
    defaultValues: { username: "", email: "", password: "" }
  });

  const onSubmit = async (data: RegisterRequest) => {
    try {
      await requests.post<CreatedUserResponseDto>("Authentication/register", data);

      navigate('/login');
    } catch (error) {
      // The axios interceptor already handles the toast notification
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 50%, #1e3a4a 0%, var(--bg-dark) 100%)', p: 2 }}>
      <Paper elevation={0} sx={{ width: '100%', maxWidth: 480, bgcolor: 'var(--surface-dark)', border: '1px solid var(--border-dark)', borderRadius: '24px', p: { xs: 4, sm: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', mb: 1 }}>Aramıza Katıl!</Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>Alışverişlerini yorumlatmaya başlamak için hesap oluştur.</Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} noValidate>
          <TextField
            {...register("username", { required: "Kullanıcı adı gereklidir." })}
            fullWidth
            placeholder="Kullanıcı Adı"
            error={!!errors.username}
            helperText={errors.username?.message}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><PersonOutlineIcon sx={{ color: 'var(--text-muted)' }} /></InputAdornment>,
                sx: inputStyles
              }
            }}
          />

          <TextField
            {...register("email", {
              required: "E-posta gereklidir.",
              pattern: { value: /^\S+@\S+$/i, message: "Geçerli bir e-posta giriniz." }
            })}
            fullWidth
            placeholder="ornek@mail.com"
            error={!!errors.email}
            helperText={errors.email?.message}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><MailOutlineIcon sx={{ color: 'var(--text-muted)' }} /></InputAdornment>,
                sx: inputStyles
              }
            }}
          />

          <TextField
            {...register("password", {
              required: "Şifre gereklidir.",
              minLength: { value: 6, message: "Şifre en az 6 karakter olmalıdır." }
            })}
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="Şifre"
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ color: 'var(--text-muted)' }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} size="small" aria-label="şifre görünürlüğünü değiştir">
                      {showPassword ? <VisibilityIcon sx={{ color: 'var(--text-muted)' }} /> : <VisibilityOffIcon sx={{ color: 'var(--text-muted)' }} />}
                    </IconButton>
                  </InputAdornment>
                ),
                sx: inputStyles
              }
            }}
          />

          <Button
            type="submit"
            variant="contained"
            fullWidth
            loading={isSubmitting}
            sx={{
              bgcolor: 'var(--primary)',
              py: 1.8,
              borderRadius: '12px',
              fontWeight: 800,
              textTransform: 'none',
              mt: 2,
              '&:hover': { bgcolor: '#0b8ed1' }
            }}
          >
            Kayıt Ol
          </Button>

          <Typography variant="body2" sx={{ textAlign: 'center', color: 'var(--text-muted)', mt: 1 }}>
            Zaten hesabın var mı? {' '}
            <Button
              variant="text"
              onClick={() => navigate('/login')}
              sx={{ color: 'var(--primary)', fontWeight: 800, textTransform: 'none', p: 0, minWidth: 'auto', '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' } }}
            >
              Giriş Yap
            </Button>
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

const inputStyles = {
  bgcolor: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '12px',
  color: '#fff',
  '& .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--border-dark)' },
  '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'var(--primary)' },
};

export default Register;
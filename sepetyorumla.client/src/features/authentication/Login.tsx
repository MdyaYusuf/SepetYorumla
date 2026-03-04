import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Box, Typography, TextField, Button, Paper, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store/store';
import { setCredentials } from './authSlice';
import { requests } from '../../api/axiosInstance';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import type { LoginRequest } from '../../models/User';
import type { TokenResponseDto } from '../../models/Token';

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginRequest>({
    defaultValues: { email: "", password: "" }
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      const response = await requests.post<TokenResponseDto>("Authentication/login", data);

      dispatch(setCredentials(response.data));

      navigate('/home');
    } catch (error) {
      // The axios interceptor already handles the toast notification
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'radial-gradient(circle at 50% 50%, #1e3a4a 0%, var(--bg-dark) 100%)', p: 2 }}>
      <Paper elevation={0} sx={{ width: '100%', maxWidth: 480, bgcolor: 'var(--surface-dark)', border: '1px solid var(--border-dark)', borderRadius: '24px', p: { xs: 4, sm: 6 } }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#fff', mb: 1 }}>Tekrar Hoşgeldin!</Typography>
          <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>Sepetindeki ürünleri yorumlamaya devam et.</Typography>
        </Box>

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }} noValidate>
          <TextField
            {...register("email", { required: "E-posta adresi gerekli." })}
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
              required: "Şifre gerekli.",
              minLength: { value: 6, message: "Şifre en az 6 karakter olmalıdır." }
            })}
            fullWidth
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            error={!!errors.password}
            helperText={errors.password?.message}
            slotProps={{
              input: {
                startAdornment: <InputAdornment position="start"><LockOutlinedIcon sx={{ color: 'var(--text-muted)' }} /></InputAdornment>,
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} size="small">
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
            sx={{ bgcolor: 'var(--primary)', py: 1.8, borderRadius: '12px', fontWeight: 800, textTransform: 'none', mt: 2 }}
          >
            Giriş Yap
          </Button>
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

export default Login;
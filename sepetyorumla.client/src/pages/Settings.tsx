import React, { useState, useRef } from 'react';
import {
  Box, Container, Typography, Paper, TextField, Button, Avatar,
  IconButton, Stack, Grid, InputAdornment, Divider, Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import LockResetIcon from '@mui/icons-material/LockReset';
import { useAppSelector, useAppDispatch } from '../store/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserService } from '../api/userService';
import { updateUser } from '../features/authentication/authSlice';
import Sidebar from '../components/layout/Sidebar';
import type { UpdateUserRequest } from '../models/User';

const Settings: React.FC = () => {
  const API_BASE_URL = "http://localhost:5222";
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFullUrl = (path: string | null | undefined) => {

    if (!path) {

      return undefined;
    }

    if (path.startsWith('http')) {

      return path;
    }

    return `${API_BASE_URL}${path}`;
  };

  const [bio, setBio] = useState(user?.bio || '');
  const [previewUrl, setPreviewUrl] = useState<string | null>(getFullUrl(user?.profileImageUrl) || null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async () => {

    if (!user) {

      return;
    }

    const request: UpdateUserRequest = {
      id: user.id,
      username: user.username,
      email: user.email,
      bio: bio,
      imageFile: imageFile || undefined
    };

    try {
      await UserService.update(request);

      dispatch(updateUser({
        bio: bio,
        profileImageUrl: previewUrl || user.profileImageUrl
      }));
    } catch (error) {
      // The axios interceptor already handles the toast notification
    }
  };

  const handleChangePassword = async () => {

    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifreler uyuşmuyor!");

      return;
    }

    try {
      await UserService.changePassword({
        currentPassword: oldPassword,
        newPassword,
        confirmNewPassword: confirmPassword
      });

      setOldPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      // The axios interceptor already handles the toast notification
    }
  };

  return (
    <Container maxWidth="xl" sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid container spacing={4} sx={{ height: '100%' }}>

        <Grid size={{ xs: 0, md: 2.5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 9.5 }} sx={{
          height: '100%',
          overflowY: 'auto',
          borderLeft: '1px solid var(--border-dark)',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' }
        }}>
          <Box sx={{ pt: 3, px: { xs: 2, md: 8 }, pb: 8 }}>

            <Box sx={{ mb: 6 }}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                sx={{ mb: 2, '& .MuiBreadcrumbs-separator': { color: 'var(--text-muted)' } }}
              >
                <MuiLink href="/home" underline="hover" sx={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>
                  Ana Sayfa
                </MuiLink>
                <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700 }}>
                  Ayarlar
                </Typography>
              </Breadcrumbs>

              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  startIcon={<ArrowBackIcon />}
                  onClick={() => navigate('/home')}
                  sx={{
                    color: 'var(--text-muted)',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    px: 0,
                    '&:hover': { color: 'var(--text-white)', bgcolor: 'transparent' }
                  }}
                >
                  Geri Dön
                </Button>
              </Box>
            </Box>

            <Grid container spacing={6}>
              <Grid size={{ xs: 12, lg: 7 }}>
                <Paper sx={{ p: 4, bgcolor: 'var(--surface-dark)', borderRadius: '32px', border: '1px solid var(--border-dark)', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <PersonIcon sx={{ color: 'var(--primary)' }} />
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff' }}>Profil Bilgileri</Typography>
                    </Stack>
                    <Box sx={{ bgcolor: 'rgba(13, 166, 242, 0.1)', color: 'var(--primary)', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Kişisel</Box>
                  </Stack>

                  <Stack spacing={2} alignItems="center">
                    <Box sx={{ position: 'relative' }}>
                      <Avatar
                        src={previewUrl || undefined}
                        sx={{
                          width: 120,
                          height: 120,
                          border: '4px solid var(--border-dark)',
                          transition: 'transform 0.2s',
                          '&:hover': { transform: 'scale(1.02)' }
                        }}
                      >
                        {!previewUrl && (user?.username?.[0].toUpperCase() || 'U')}
                      </Avatar>
                      <IconButton
                        onClick={() => fileInputRef.current?.click()}
                        sx={{
                          position: 'absolute', bottom: 5, right: 5,
                          bgcolor: 'var(--primary)', color: '#fff',
                          border: '4px solid var(--surface-dark)',
                          '&:hover': { bgcolor: 'var(--primary)', filter: 'brightness(1.1)', transform: 'scale(1.1)' }
                        }}
                        size="small"
                      >
                        <PhotoCameraIcon sx={{ fontSize: 16 }} />
                      </IconButton>
                      <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleImageChange} />
                    </Box>
                    <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 600 }}>Profil fotoğrafını değiştirmek için tıklayın</Typography>
                  </Stack>

                  <Stack spacing={2} sx={{ mt: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.2, borderBottom: '1px solid var(--border-dark)', px: 1 }}>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 800 }}>KULLANICI ADI</Typography>
                      <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>{user?.username}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1.2, borderBottom: '1px solid var(--border-dark)', px: 1 }}>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 800 }}>E-POSTA</Typography>
                      <Typography variant="subtitle2" sx={{ color: '#fff', fontWeight: 600 }}>{user?.email}</Typography>
                    </Box>

                    <Box sx={{ pt: 1 }}>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 800, ml: 1, mb: 1, display: 'block' }}>HAKKIMDA</Typography>
                      <TextField
                        fullWidth multiline rows={6} variant="filled" placeholder="Kendinizden bahsederek biyografinizi oluşturun..."
                        value={bio} onChange={(e) => setBio(e.target.value)}
                        sx={{ '& .MuiFilledInput-root': { borderRadius: '16px' } }}
                      />
                    </Box>

                    <Button
                      variant="contained"
                      onClick={handleUpdateProfile}
                      startIcon={<SaveIcon />}
                      sx={{ borderRadius: '16px', py: 1.8, fontWeight: 800, mt: 1, fontSize: '0.9rem', bgcolor: 'var(--primary)', boxShadow: '0 8px 24px rgba(13, 166, 242, 0.2)' }}
                    >
                      Profili Güncelle
                    </Button>
                  </Stack>
                </Paper>
              </Grid>

              <Grid size={{ xs: 12, lg: 5 }}>
                <Paper sx={{ p: 4, bgcolor: 'var(--surface-dark)', borderRadius: '32px', border: '1px solid var(--border-dark)', boxShadow: '0 10px 40px rgba(0,0,0,0.2)' }}>

                  <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <SecurityIcon sx={{ color: 'var(--primary)' }} />
                      <Typography variant="h6" sx={{ fontWeight: 800, color: '#fff' }}>Güvenlik</Typography>
                    </Stack>
                    <Box sx={{ bgcolor: 'rgba(76, 175, 80, 0.1)', color: '#4caf50', px: 2, py: 0.5, borderRadius: '20px', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>Aktif</Box>
                  </Stack>

                  <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 3, lineHeight: 1.5 }}>
                    Hesabınızı güvende tutmak için şifrenizi düzenli aralıklarla değiştirmenizi öneririz.
                  </Typography>

                  <Stack spacing={2.5}>
                    <TextField
                      fullWidth type="password" label="Mevcut Şifre" variant="filled"
                      value={oldPassword} onChange={(e) => setOldPassword(e.target.value)}
                      slotProps={{ input: { endAdornment: <InputAdornment position="end"><VisibilityIcon sx={{ color: 'var(--text-muted)', fontSize: 18 }} /></InputAdornment> } }}
                    />

                    <Divider sx={{ borderColor: 'var(--border-dark)', my: 0.5 }} />

                    <TextField fullWidth type="password" label="Yeni Şifre" variant="filled" placeholder="En az 8 karakter" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                    <TextField fullWidth type="password" label="Yeni Şifre (Tekrar)" variant="filled" placeholder="Yeni şifreyi onaylayın" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                    <Box sx={{ bgcolor: 'rgba(13, 166, 242, 0.05)', p: 2, borderRadius: '16px', border: '1px solid rgba(13, 166, 242, 0.1)', display: 'flex', gap: 2 }}>
                      <InfoIcon sx={{ color: 'var(--primary)', fontSize: 18 }} />
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', lineHeight: 1.4 }}>
                        Şifreniz en az 8 karakter uzunluğunda olmalıdır. Büyük harf, küçük harf ve rakam içermelidir.
                      </Typography>
                    </Box>

                    <Button
                      variant="contained"
                      onClick={handleChangePassword}
                      startIcon={<LockResetIcon />}
                      sx={{ borderRadius: '16px', py: 1.8, fontWeight: 800, mt: 1, bgcolor: 'var(--primary)', boxShadow: '0 8px 24px rgba(13, 166, 242, 0.2)' }}
                    >
                      Şifreyi Değiştir
                    </Button>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Settings;
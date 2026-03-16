import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box, Container, Typography, Avatar, Button, Grid,
  Stack, CircularProgress, Paper
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShareIcon from '@mui/icons-material/Share';
import VerifiedIcon from '@mui/icons-material/Verified';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ForumIcon from '@mui/icons-material/Forum';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { UserService } from '../api/userService';
import { useAppSelector } from '../store/store';
import type { ProfileResponse } from '../models/User';
import type { BasketResponseDto } from '../models/Basket';
import { getFullUrl } from '../helpers/imageHelper';
import { toast } from 'react-toastify';
import BasketCard from '../components/shared/BasketCard';
import EditIcon from '@mui/icons-material/Edit';
import { FollowService } from '../api/followService';

const ProfilePage: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [profile, setProfile] = useState<ProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAppSelector((state) => state.auth);
  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {

    if (username) {
      setLoading(true);
      UserService.getByUsername(username)
        .then((res) => {

          if (res.success) {
            setProfile(res.data);
          }
        })
        .catch(() => {
          // The axios interceptor already handles the toast notification
        })
        .finally(() => setLoading(false));
    }
  }, [username]);

  const handleFollowClick = async () => {

    if (!isAuthenticated) {
      toast.info("Takip etmek için giriş yapmalısınız.");
      navigate('/login');

      return;
    }

    if (!profile) {

      return;
    }

    try {
      const res = await FollowService.toggleFollow(profile.id);

      if (res.success) {
        const nowFollowing = !profile.isFollowing;
        setProfile({
          ...profile,
          isFollowing: nowFollowing,
          followersCount: nowFollowing
            ? profile.followersCount + 1
            : Math.max(0, profile.followersCount - 1)
        });
      }
    } catch (error) {
      // The axios interceptor already handles the toast notification
    }
  };

  const handleShareProfile = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profil bağlantısı kopyalandı!");
  };

  if (loading) {

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (!profile) {

    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            color: 'var(--text-muted)',
            textTransform: 'none',
            fontWeight: 700,
            fontSize: '1rem',
            px: 0,
            minWidth: 'auto',
            '&:hover': { color: 'var(--text-white)', bgcolor: 'transparent' }
          }}
        >
          Geri Dön
        </Button>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', mb: 6 }}>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <Box sx={{
            p: 0.5,
            borderRadius: '50%',
            background: 'linear-gradient(to bottom, var(--primary), transparent)',
            boxShadow: '0 0 20px rgba(13, 166, 242, 0.2)'
          }}>
            <Avatar
              src={getFullUrl(profile.profileImageUrl)}
              sx={{ width: 120, height: 120, border: '4px solid var(--bg-dark)' }}
            >
              {profile.username[0].toUpperCase()}
            </Avatar>
          </Box>
          <Box sx={{
            position: 'absolute', bottom: 4, right: 4, bgcolor: 'var(--primary)',
            borderRadius: '50%', p: 0.5, border: '4px solid var(--bg-dark)', display: 'flex'
          }}>
            <VerifiedIcon sx={{ fontSize: 16, color: 'white' }} />
          </Box>
        </Box>

        <Typography variant="h4" sx={{ fontWeight: 800, color: 'var(--text-white)', mb: 1 }}>
          @{profile.username}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'var(--text-muted)',
            maxWidth: '800px',
            mb: 2,
            fontSize: '1rem',
            lineHeight: 1.6,
            fontStyle: profile.bio ? 'normal' : 'italic'
          }}
        >
          {profile.bio || "Henüz bir biyografi eklenmemiş."}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" sx={{ color: 'var(--text-muted)', mb: 4, opacity: 0.7 }}>
          <CalendarMonthIcon fontSize="small" />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>
            Katılım Tarihi: {new Date(profile.createdDate).toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}
          </Typography>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ width: '100%', maxWidth: 400 }}>
          {isOwnProfile ? (
            <Button
              fullWidth
              variant="contained"
              onClick={() => navigate('/settings')}
              startIcon={<EditIcon />}
              sx={{ borderRadius: '24px', py: 1.5, fontWeight: 900, textTransform: 'none' }}
            >
              Profili Düzenle
            </Button>
          ) : (
              <Button
                fullWidth
                onClick={handleFollowClick}
                variant={profile.isFollowing ? "outlined" : "contained"}
                sx={{
                  borderRadius: '24px', py: 1.5, fontWeight: 900, textTransform: 'none',
                  ...(profile.isFollowing && {
                    color: 'var(--text-white)',
                    borderColor: 'var(--border-dark)',
                    '&:hover': { borderColor: '#ff4b4b', color: '#ff4b4b', bgcolor: 'transparent' }
                  })
                }}
              >
                {profile.isFollowing ? "Takip Bırak" : "Takip Et"}
              </Button>
          )}
          <Button
            fullWidth
            onClick={handleShareProfile}
            variant="outlined"
            startIcon={<ShareIcon />}
            sx={{
              borderRadius: '24px', py: 1.5, fontWeight: 900, textTransform: 'none',
              borderColor: 'var(--border-dark)', color: 'var(--text-white)',
              '&:hover': { borderColor: 'var(--primary)', bgcolor: 'transparent' }
            }}
          >
            Paylaş
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={2} sx={{ mb: 8 }}>
        {[
          { label: 'TAKİPÇİ', val: profile.followersCount, icon: <GroupIcon /> },
          { label: 'TAKİP EDİLEN', val: profile.followingCount, icon: <PersonAddIcon /> },
          { label: 'ALINAN YORUMLAR', val: profile.totalCommentsReceived, icon: <ForumIcon /> },
          { label: 'ALINAN BEĞENİLER', val: profile.totalLikesReceived, icon: <FavoriteIcon /> },
        ].map((stat, i) => (
          <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
            <Paper sx={{
              p: 3, borderRadius: '24px', textAlign: 'center',
              bgcolor: 'var(--surface-dark)', border: '1px solid var(--border-dark)',
              transition: '0.3s', '&:hover': { borderColor: 'var(--primary)', transform: 'translateY(-2px)' }
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, color: 'var(--primary)', opacity: 0.8 }}>
                {stat.icon}
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 900, color: 'var(--text-white)' }}>
                {stat.val > 999 ? `${(stat.val / 1000).toFixed(1)}K` : stat.val}
              </Typography>
              <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 800, letterSpacing: 1.5, fontSize: '0.6rem' }}>
                {stat.label}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-white)', mb: 4 }}>
          En Çok Beğenilen Sepetler
        </Typography>

        {profile.topBaskets.length > 0 ? (
          <Grid container spacing={3}>
            {profile.topBaskets.map((basket: BasketResponseDto) => (
              <Grid size={{ xs: 12, md: 4 }} key={basket.id}>
                <BasketCard basket={basket} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{
            p: 4,
            textAlign: 'center',
            bgcolor: 'var(--surface-dark)',
            border: '1px dashed var(--border-dark)',
            borderRadius: '24px'
          }}>
            <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
              {isOwnProfile
                ? "Henüz bir sepet paylaşmadın."
                : "Bu kullanıcı henüz bir sepet paylaşmamış."}
            </Typography>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default ProfilePage;
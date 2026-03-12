import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Button,
  Paper,
  Stack,
  Tab,
  Tabs,
  CircularProgress,
  Breadcrumbs,
  Link as MuiLink
} from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import EditIcon from '@mui/icons-material/Edit';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import BasketCard from '../components/shared/BasketCard';
import { UserService } from '../api/userService';
import { BasketService } from '../api/basketService';
import { getFullUrl } from '../helpers/imageHelper';
import type { UserProfileStats } from '../models/User';
import type { BasketResponseDto } from '../models/Basket';

const ProfilePage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState<UserProfileStats | null>(null);
  const [displayBaskets, setDisplayBaskets] = useState<BasketResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);

  const getMembershipDuration = () => {

    if (!stats?.createdDate) {

      return "Yeni Üye";
    }

    const created = new Date(stats.createdDate);
    const now = new Date();
    const months = (now.getFullYear() - created.getFullYear()) * 12 + (now.getMonth() - created.getMonth());

    return months <= 0 ? "Yeni Üye" : `${months} Aylık Üye`;
  };

  const fetchInitialData = useCallback(async () => {

    if (!user) {

      return;
    }
    setLoading(true);
    try {
      const [statsRes, basketsRes] = await Promise.all([
        UserService.getStats(user.id),
        BasketService.getMyBaskets()
      ]);
      setStats(statsRes.data);
      setDisplayBaskets(basketsRes.data);
    } catch (error) {
      // The axios interceptor handles the toast notification
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleTabChange = async (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);

    if (!user) {

      return;
    }

    setTabLoading(true);
    try {
      let res;

      switch (newValue) {
        case 0:
          res = await BasketService.getMyBaskets();
          break;
        case 1:
          res = await BasketService.getMyLikedBaskets();
          break;
        case 2:
          res = await BasketService.getSavedBaskets();
          break;
        case 3:
          res = await BasketService.getMyCommentedBaskets();
          break;
        default:
          res = await BasketService.getMyBaskets();
      }

      if (res) {
        setDisplayBaskets(res.data);
      }
    } catch (error) {
      // The axios interceptor already handles the toast notification
    } finally {
      setTabLoading(false);
    }
  };

  useEffect(() => {
    fetchInitialData();
  }, [fetchInitialData]);

  if (loading) {

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

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
          <Box sx={{ p: { xs: 2, md: 4 } }}>

            <Breadcrumbs
              separator={<NavigateNextIcon fontSize="small" />}
              sx={{ mb: 1.5, '& .MuiBreadcrumbs-separator': { color: 'var(--text-muted)' } }}
            >
              <MuiLink
                onClick={() => navigate('/home')}
                sx={{ color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
              >
                Ana Sayfa
              </MuiLink>
              <Typography sx={{ color: 'var(--text-white)', fontSize: '0.75rem', fontWeight: 700 }}>
                Profilim
              </Typography>
            </Breadcrumbs>

            <Button
              startIcon={<ArrowBackIcon sx={{ fontSize: '1rem' }} />}
              onClick={() => navigate(-1)}
              sx={{
                mb: 3,
                color: 'var(--text-muted)',
                fontSize: '0.8rem',
                fontWeight: 700,
                textTransform: 'none',
                px: 0,
                minWidth: 'auto',
                '&:hover': {
                  color: 'var(--primary)',
                  bgcolor: 'transparent'
                }
              }}
            >
              Geri Dön
            </Button>

            <Paper sx={{
              p: 3,
              bgcolor: 'var(--surface-dark)',
              borderRadius: '32px',
              border: '1px solid var(--border-dark)',
              mb: 2,
              position: 'relative',
              overflow: 'hidden'
            }}>
              <Box sx={{
                position: 'absolute', top: -100, right: -100, width: 300, height: 300,
                bgcolor: 'rgba(13, 166, 242, 0.05)', borderRadius: '50%', filter: 'blur(60px)'
              }} />

              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} alignItems="center">
                <Avatar
                  src={getFullUrl(user?.profileImageUrl)}
                  sx={{
                    width: 110,
                    height: 110,
                    border: '4px solid var(--primary)',
                    p: 0.5,
                    bgcolor: 'transparent'
                  }}
                >
                  {user?.username?.[0].toUpperCase()}
                </Avatar>

                <Box sx={{ flexGrow: 1, textAlign: { xs: 'center', md: 'left' } }}>
                  <Stack direction="row" spacing={2} alignItems="center" justifyContent={{ xs: 'center', md: 'flex-start' }} sx={{ mb: 0.5 }}>
                    <Typography variant="h5" sx={{ fontWeight: 800 }}>{user?.username}</Typography>
                    <Box sx={{
                      bgcolor: 'rgba(13, 166, 242, 0.1)', color: 'var(--primary)',
                      px: 1.2, py: 0.3, borderRadius: '20px', fontSize: '0.65rem', fontWeight: 800
                    }}>
                      {getMembershipDuration()}
                    </Box>
                  </Stack>

                  <Typography variant="body2" sx={{ color: 'var(--text-muted)', mb: 1.5, maxWidth: 700, lineHeight: 1.4 }}>
                    {user?.bio || "Henüz bir biyografi eklenmemiş."}
                  </Typography>

                  <Stack direction="row" spacing={3} color="var(--text-muted)" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CalendarMonthIcon sx={{ fontSize: 16 }} />
                      <Typography variant="caption" sx={{ fontWeight: 600 }}>
                        {new Date(stats?.createdDate || '').toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' })}'da Katıldı
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<EditIcon sx={{ fontSize: '0.9rem' }} />}
                  onClick={() => navigate('/settings')}
                  sx={{
                    borderRadius: '10px',
                    borderColor: 'var(--border-dark)',
                    color: 'var(--text-white)',
                    textTransform: 'none',
                    fontWeight: 700,
                    fontSize: '0.75rem'
                  }}
                >
                  Profili Düzenle
                </Button>
              </Stack>
            </Paper>

            <Grid container spacing={3} sx={{ mb: 4 }}>
              {[
                { label: 'SEPETLER', val: stats?.totalBaskets || 0, icon: <ShoppingBagIcon /> },
                { label: 'BEĞENİLER', val: stats?.totalLikesReceived || 0, icon: <FavoriteIcon /> },
                { label: 'KAYDEDİLEN', val: stats?.totalSavedBaskets || 0, icon: <BookmarkIcon /> },
                { label: 'YORUMLAR', val: stats?.totalCommentsMade || 0, icon: <ForumIcon /> }
              ].map((stat, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper sx={{
                    p: 2.5, bgcolor: 'var(--surface-dark)', borderRadius: '24px', border: '1px solid var(--border-dark)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: '0.3s', '&:hover': { borderColor: 'var(--primary)', transform: 'translateY(-2px)' }
                  }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 800, letterSpacing: 1, fontSize: '0.6rem' }}>{stat.label}</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800 }}>{stat.val}</Typography>
                    </Box>
                    <Box sx={{ p: 1, bgcolor: 'rgba(13, 166, 242, 0.1)', color: 'var(--primary)', borderRadius: '10px' }}>
                      {stat.icon}
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            <Tabs
              value={tabValue}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                mb: 2,
                borderBottom: '1px solid var(--border-dark)',
                '& .MuiTab-root': { color: 'var(--text-muted)', fontWeight: 800, textTransform: 'none', px: 3 },
                '& .Mui-selected': { color: 'var(--primary)' }
              }}
            >
              <Tab label="Sepetlerim" icon={<ShoppingBagIcon sx={{ fontSize: 16 }} />} iconPosition="start" />
              <Tab label="Beğendiklerim" icon={<FavoriteIcon sx={{ fontSize: 16 }} />} iconPosition="start" />
              <Tab label="Kaydedilenler" icon={<BookmarkIcon sx={{ fontSize: 16 }} />} iconPosition="start" />
              <Tab label="Yorum Yaptıklarım" icon={<ForumIcon sx={{ fontSize: 16 }} />} iconPosition="start" />
            </Tabs>

            {tabLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress size={24} /></Box>
            ) : (
              <Grid container spacing={3}>
                {displayBaskets.length > 0 ? (
                  displayBaskets.map(basket => (
                    <Grid key={basket.id} size={{ xs: 12, sm: 6, lg: 4 }} onClick={() => navigate(`/basket/${basket.id}`)} sx={{ cursor: 'pointer' }}>
                      <BasketCard basket={basket} />
                    </Grid>
                  ))
                ) : (
                  <Typography sx={{ color: 'var(--text-muted)', p: 4, textAlign: 'center', width: '100%' }}>
                    {tabValue === 0 ? "Henüz sepet oluşturmadınız." :
                     tabValue === 1 ? "Henüz bir sepeti beğenmediniz." :
                     tabValue === 2 ? "Henüz bir sepeti kaydetmediniz." : "Henüz bir sepete yorum yapmadınız."}
                  </Typography>
                )}
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
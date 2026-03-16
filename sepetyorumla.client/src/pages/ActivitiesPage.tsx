import React, { useEffect, useState, useCallback } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Paper,
  Tab,
  Tabs,
  CircularProgress,
  Breadcrumbs,
  Link as MuiLink,
  Stack
} from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ForumIcon from '@mui/icons-material/Forum';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useAppSelector } from '../store/store';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import BasketCard from '../components/shared/BasketCard';
import { UserService } from '../api/userService';
import { BasketService } from '../api/basketService';
import type { UserActivityStats } from '../models/User';
import type { BasketResponseDto } from '../models/Basket';

const ActivitiesPage: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  const [tabValue, setTabValue] = useState(0);
  const [stats, setStats] = useState<UserActivityStats | null>(null);
  const [displayBaskets, setDisplayBaskets] = useState<BasketResponseDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [tabLoading, setTabLoading] = useState(false);

  const fetchInitialData = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const [statsRes, basketsRes] = await Promise.all([
        UserService.getStats(user.id),
        BasketService.getMyBaskets()
      ]);
      setStats(statsRes.data);
      setDisplayBaskets([...basketsRes.data].reverse());
    } catch (error) {
      // The axios interceptor already handles the toast notification
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleTabChange = async (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    if (!user) return;

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
        setDisplayBaskets([...res.data].reverse());
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
              sx={{ mb: 2, '& .MuiBreadcrumbs-separator': { color: 'var(--text-muted)' } }}
            >
              <MuiLink
                onClick={() => navigate('/home')}
                sx={{
                  color: 'var(--text-muted)',
                  fontSize: '0.7rem',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Ana Sayfa
              </MuiLink>
              <Typography sx={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 700 }}>
                Aktivitelerim
              </Typography>
            </Breadcrumbs>

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

            <Stack direction="row" justifyContent="space-between" alignItems="flex-end" sx={{ mb: 6 }}>
              <Box>
                <Typography variant="h4" sx={{ fontWeight: 900, color: 'var(--text-white)', mb: 1 }}>
                  Aktivite Paneli
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: 'var(--text-muted)',
                    maxWidth: '550px',
                    lineHeight: 1.6
                  }}
                >
                  Oluşturduğun, beğendiğin, kaydettiğin ve yorum yaptığın sepetleri görebilirsin.
                  Dönüp bakmak istediğin bütün sepetler burada. Alışveriş yolculuğunun kontrolü tamamen sende.
                </Typography>
              </Box>

              <Button
                variant="contained"
                onClick={() => navigate('/home')}
                startIcon={<ShoppingBasketIcon />}
                sx={{
                  borderRadius: '12px',
                  textTransform: 'none',
                  fontWeight: 700,
                  mb: 3,
                  bgcolor: 'rgba(13, 166, 242, 0.1)',
                  color: 'var(--primary)',
                  '&:hover': { bgcolor: 'rgba(13, 166, 242, 0.2)' }
                }}
              >
                Yeni Sepetler Keşfet
              </Button>
            </Stack>

            <Grid container spacing={3} sx={{ mb: 6 }}>
              {[
                { label: 'SEPETLERİM', val: stats?.totalBaskets || 0, icon: <ShoppingBasketIcon /> },
                { label: 'BEĞENDİKLERİM', val: stats?.totalBasketsLiked || 0, icon: <FavoriteIcon /> },
                { label: 'KAYDETTİKLERİM', val: stats?.totalSavedBaskets || 0, icon: <BookmarkIcon /> },
                { label: 'YORUM YAPTIKLARIM', val: stats?.totalCommentsMade || 0, icon: <ForumIcon /> }
              ].map((stat, i) => (
                <Grid key={i} size={{ xs: 12, sm: 6, md: 3 }}>
                  <Paper sx={{
                    p: 2.5, bgcolor: 'var(--surface-dark)', borderRadius: '24px', border: '1px solid var(--border-dark)',
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    transition: '0.3s', '&:hover': { borderColor: 'var(--primary)', transform: 'translateY(-2px)' }
                  }}>
                    <Box>
                      <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 800, letterSpacing: 1, fontSize: '0.6rem' }}>{stat.label}</Typography>
                      <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-white)' }}>{stat.val}</Typography>
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
                mb: 4,
                borderBottom: '1px solid var(--border-dark)',
                '& .MuiTab-root': { color: 'var(--text-muted)', fontWeight: 800, textTransform: 'none', px: 3, minHeight: '48px' },
                '& .Mui-selected': { color: 'var(--primary)' },
                '& .MuiTabs-indicator': { bgcolor: 'var(--primary)' }
              }}
            >
              <Tab label="Sepetlerim" icon={<ShoppingBasketIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
              <Tab label="Beğendiklerim" icon={<FavoriteIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
              <Tab label="Kaydettiklerim" icon={<BookmarkIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
              <Tab label="Yorum Yaptıklarım" icon={<ForumIcon sx={{ fontSize: 18 }} />} iconPosition="start" />
            </Tabs>

            {tabLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 10 }}><CircularProgress size={24} /></Box>
            ) : (
              <Grid container spacing={3}>
                {displayBaskets.length > 0 ? (
                  displayBaskets.map(basket => (
                    <Grid key={basket.id} size={{ xs: 12, sm: 6, lg: 4 }}>
                      <BasketCard basket={basket} />
                    </Grid>
                  ))
                ) : (
                  <Box sx={{ width: '100%', py: 8, textAlign: 'center' }}>
                    <Typography sx={{ color: 'var(--text-muted)', fontWeight: 500 }}>
                      {tabValue === 0 ? "Henüz sepet oluşturmadınız." :
                        tabValue === 1 ? "Henüz bir sepeti beğenmediniz." :
                          tabValue === 2 ? "Henüz bir sepeti kaydetmediniz." : "Henüz bir sepete yorum yapmadınız."}
                    </Typography>
                  </Box>
                )}
              </Grid>
            )}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ActivitiesPage;
import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Chip,
  Stack
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

import Sidebar from '../../components/layout/Sidebar';
import BasketFeedCard from '../../components/shared/BasketFeedCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import type { Basket } from '../../models/Basket';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const categories = ["Teknoloji", "Moda", "Mutfak", "Ev & Yaşam", "Spor", "Kitap", "Kampçılık"];

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const feedBaskets: Basket[] = [
    {
      id: '1',
      userId: 'user-123',
      username: 'Ayşe Demir',
      userProfileImageUrl: 'https://i.pravatar.cc/150?u=ayse',
      createdDate: new Date().toISOString(),
      title: '2024 Home Office Setup Hazırlığı',
      description: 'Yazılım geliştirme için ideal ekipmanlar.',
      products: [
        { id: 'p1', name: 'Mekanik Klavye', price: 2500, categoryName: 'Teknoloji' },
        { id: 'p2', name: '4K Monitör', price: 15000, categoryName: 'Teknoloji' },
        { id: 'p3', name: 'Ergonomik Koltuk', price: 25000, categoryName: 'Mobilya' }
      ]
    }
  ];

  return (
    <Container maxWidth="xl" sx={{ height: '100vh', overflow: 'hidden' }}>
      <Grid container spacing={4} sx={{ height: '100%' }}>

        <Grid size={{ xs: 0, md: 2.5 }} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Sidebar />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }} sx={{
          height: '100%',
          overflowY: 'auto',
          borderLeft: '1px solid var(--border-dark)',
          borderRight: '1px solid var(--border-dark)',
          scrollbarWidth: 'none',
          '&::-webkit-scrollbar': { display: 'none' }
        }}>
          <Box sx={{ pt: 3, px: 2 }}>
            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: 4,
              position: 'sticky',
              top: 0,
              bgcolor: 'var(--bg-dark)',
              zIndex: 10,
              py: 1
            }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-white)' }}>
                Akış
              </Typography>

              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '60%', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    width: '70%',
                    bgcolor: 'var(--primary)',
                    borderRadius: '16px',
                    py: 1,
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    textTransform: 'none',
                    boxShadow: '0 4px 12px rgba(13, 166, 242, 0.25)',
                    whiteSpace: 'nowrap',
                    '&:hover': { bgcolor: '#0b8ed1' }
                  }}
                >
                  Yeni Sepet Paylaş
                </Button>
                <IconButton size="small" sx={{ color: 'var(--text-muted)' }}>
                  <FilterListIcon />
                </IconButton>
              </Stack>
            </Box>

            {feedBaskets.map((b) => (
              <BasketFeedCard key={b.id} basket={b} />
            ))}
          </Box>
        </Grid>

        <Grid size={{ xs: 0, md: 3.5 }} sx={{ display: { xs: 'none', md: 'block' }, pt: 3 }}>
          <TextField
            fullWidth
            placeholder="Sepet veya kullanıcı ara..."
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'var(--text-muted)' }} />
                  </InputAdornment>
                ),
                sx: {
                  borderRadius: '16px',
                  bgcolor: 'var(--surface-dark)',
                  color: 'var(--text-white)',
                  '& fieldset': { border: 'none' },
                  mb: 4
                }
              }
            }}
          />

          <Box sx={{ bgcolor: 'var(--surface-dark)', borderRadius: '24px', p: 3, border: '1px solid var(--border-dark)' }}>
            <Typography variant="h6" sx={{ color: 'var(--text-white)', fontWeight: 800, mb: 3 }}>
              Popüler Kategoriler
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5}>
              {categories.map((cat) => (
                <Chip
                  key={cat}
                  label={cat}
                  clickable
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.05)',
                    color: 'var(--text-muted)',
                    fontWeight: 600,
                    transition: '0.2s',
                    '&:hover': { bgcolor: 'var(--primary)', color: '#fff' }
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grid>

      </Grid>
    </Container>
  );
};

export default Home;
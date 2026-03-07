import React, { useEffect, useState } from 'react';
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
  Stack,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';

import Sidebar from '../../components/layout/Sidebar';
import BasketFeedCard from '../../components/shared/BasketFeedCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import type { BasketResponseDto } from '../../models/Basket';
import { BasketService } from '../../api/basketService';
import ShareBasketModal from '../../components/shared/ShareBasketModal';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [baskets, setBaskets] = useState<BasketResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = ["Teknoloji", "Moda", "Mutfak", "Ev & Yaşam", "Spor", "Kitap", "Kampçılık"];

  const fetchBaskets = async () => {
    setIsLoading(true);
    try {
      const response = await BasketService.getAll();
      setBaskets(response.data);
    } catch {
      // The axios interceptor already handles the toast notification
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    } else {
      fetchBaskets();
    }
  }, [isAuthenticated, navigate]);

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
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, position: 'sticky', top: 0, bgcolor: 'var(--bg-dark)', zIndex: 10, py: 1 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'var(--text-white)' }}>Akış</Typography>
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '60%', justifyContent: 'flex-end' }}>
                <Button variant="contained" onClick={() => setIsModalOpen(true)} startIcon={<AddCircleOutlineIcon />} sx={{ width: '70%', bgcolor: 'var(--primary)', borderRadius: '16px', py: 1, fontWeight: 800, textTransform: 'none' }}>
                  Yeni Sepet Paylaş
                </Button>
                <IconButton size="small" sx={{ color: 'var(--text-muted)' }}><FilterListIcon /></IconButton>
              </Stack>
            </Box>

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress size={40} sx={{ color: 'var(--primary)' }} /></Box>
            ) : baskets.length === 0 ? (
              <Box sx={{ textAlign: 'center', mt: 10, px: 4 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-white)', fontWeight: 700, mb: 1 }}>Henüz bir sepet yok</Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>İlk sepeti sen paylaşarak topluluğu başlatabilirsin!</Typography>
              </Box>
            ) : (
              baskets.map((b) => <BasketFeedCard key={b.id} basket={b} />)
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 0, md: 3.5 }} sx={{ display: { xs: 'none', md: 'block' }, pt: 3 }}>
          <TextField fullWidth placeholder="Sepet veya kullanıcı ara..." slotProps={{ input: { startAdornment: (<InputAdornment position="start"><SearchIcon sx={{ color: 'var(--text-muted)' }} /></InputAdornment>), sx: { borderRadius: '16px', bgcolor: 'var(--surface-dark)', color: 'var(--text-white)', '& fieldset': { border: 'none' }, mb: 4 } } }} />
          <Box sx={{ bgcolor: 'var(--surface-dark)', borderRadius: '24px', p: 3, border: '1px solid var(--border-dark)' }}>
            <Typography variant="h6" sx={{ color: 'var(--text-white)', fontWeight: 800, mb: 3 }}>Popüler Kategoriler</Typography>
            <Stack direction="row" flexWrap="wrap" gap={1.5}>
              {categories.map((cat) => (
                <Chip key={cat} label={cat} clickable sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontWeight: 600, transition: '0.2s', '&:hover': { bgcolor: 'var(--primary)', color: '#fff' } }} />
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <ShareBasketModal open={isModalOpen} onClose={() => { setIsModalOpen(false); fetchBaskets(); }} />
    </Container>
  );
};

export default Home;
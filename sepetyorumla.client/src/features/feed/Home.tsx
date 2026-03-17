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
  CircularProgress,
  Menu,
  MenuItem,
  Avatar
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setBaskets } from '../../features/basket/basketSlice';
import { CategoryService } from '../../api/categoryService';
import type { CategoryResponseDto } from '../../models/Category';
import Sidebar from '../../components/layout/Sidebar';
import BasketFeedCard from '../../components/shared/BasketFeedCard';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { BasketService } from '../../api/basketService';
import ShareBasketModal from '../../components/shared/ShareBasketModal';
import { UserService } from '../../api/userService';
import type { UserListItem } from '../../models/User';
import { getFullUrl } from '../../helpers/imageHelper';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const baskets = useAppSelector((state) => state.baskets.items);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<CategoryResponseDto[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'comments' | 'likes' | 'rating'>('date');
  const [sortAnchorEl, setSortAnchorEl] = useState<null | HTMLElement>(null);
  const [popularUsers, setPopularUsers] = useState<UserListItem[]>([]);
  const isSortMenuOpen = Boolean(sortAnchorEl);

  const fetchInitialData = async () => {
    setIsLoading(true);
    try {
      const [basketRes, categoryRes, popularRes] = await Promise.all([
        BasketService.getAll(),
        CategoryService.getAll(),
        UserService.getPopularUsers(4)
      ]);

      dispatch(setBaskets(basketRes.data));
      setCategories(categoryRes.data);
      setPopularUsers(popularRes.data);
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
      fetchInitialData();
    }
  }, [isAuthenticated, navigate]);

  const filteredBaskets = baskets.filter(basket => {
    const matchesCategory = !selectedCategoryId ||
      basket.products.some(product =>
        product.categoryName === categories.find(c => c.id === selectedCategoryId)?.name
      );

    const matchesSearch = !searchQuery ||
      basket.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      basket.username.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedBaskets = [...filteredBaskets].sort((a, b) => {

    if (sortBy === 'comments') {

      return (b.totalComments || 0) - (a.totalComments || 0);
    }

    if (sortBy === 'likes') {

      return (b.totalThumbsUp || 0) - (a.totalThumbsUp || 0);
    }

    if (sortBy === 'rating') {

      return Number(b.averageRating || 0) - Number(a.averageRating || 0);
    }

    return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
  });

  const handleSortClick = (event: React.MouseEvent<HTMLElement>) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (type?: 'date' | 'comments' | 'likes' | 'rating') => {

    if (type) {
      setSortBy(type);
    }
    setSortAnchorEl(null);
  };

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
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ width: '75%', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  onClick={() => setIsModalOpen(true)}
                  startIcon={<AddCircleOutlineIcon />}
                  sx={{
                    width: '60%',
                    bgcolor: 'var(--primary)',
                    borderRadius: '16px',
                    py: 1,
                    fontWeight: 800,
                    textTransform: 'none',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      bgcolor: 'var(--primary)',
                      filter: 'brightness(1.1)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(13, 166, 242, 0.3)',
                    },
                    '&:active': {
                      transform: 'translateY(0) scale(0.98)',
                    }
                  }}
                >
                  Yeni Sepet Paylaş
                </Button>

                <Stack
                  direction="row"
                  alignItems="center"
                  spacing={0.5}
                  onClick={handleSortClick}
                  sx={{ cursor: 'pointer', color: 'var(--text-muted)', '&:hover': { color: 'var(--primary)' } }}
                >
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>Sırala</Typography>
                  <IconButton size="small" sx={{ color: 'inherit', p: 0.5 }}>
                    <FilterListIcon sx={{ fontSize: '1.2rem' }} />
                  </IconButton>
                </Stack>
              </Stack>
            </Box>

            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 10 }}><CircularProgress size={40} sx={{ color: 'var(--primary)' }} /></Box>
            ) : sortedBaskets.length === 0 ? (
              <Box sx={{ textAlign: 'center', mt: 10, px: 4 }}>
                <Typography variant="h6" sx={{ color: 'var(--text-white)', fontWeight: 700, mb: 1 }}>
                  {searchQuery || selectedCategoryId ? "Aranan kriterlerde sepet bulunamadı" : "Henüz bir sepet yok"}
                </Typography>
                <Typography variant="body2" sx={{ color: 'var(--text-muted)' }}>
                  {searchQuery || selectedCategoryId ? "Aramanı değiştirmeyi veya filtreyi temizlemeyi dene." : "İlk sepeti sen paylaşarak topluluğu başlatabilirsin!"}
                </Typography>
              </Box>
            ) : (
              sortedBaskets.map((b) => <BasketFeedCard key={b.id} basket={b} />)
            )}
          </Box>
        </Grid>

        <Grid size={{ xs: 0, md: 3.5 }} sx={{ display: { xs: 'none', md: 'block' }, pt: 3 }}>
          <TextField
            fullWidth
            placeholder="Sepet ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
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
              <Chip
                label="Tümünü Gör"
                clickable
                onClick={() => setSelectedCategoryId(null)}
                sx={{
                  bgcolor: selectedCategoryId === null ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                  color: selectedCategoryId === null ? '#fff' : 'var(--text-muted)',
                  fontWeight: 700,
                  transition: '0.2s'
                }}
              />
              {categories.map((cat) => {
                const isActive = selectedCategoryId === cat.id;

                return (
                  <Chip
                    key={cat.id}
                    label={cat.name}
                    clickable
                    onClick={() => setSelectedCategoryId(isActive ? null : cat.id)}
                    sx={{
                      bgcolor: isActive ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                      color: isActive ? '#fff' : 'var(--text-muted)',
                      fontWeight: 600,
                      transition: '0.2s',
                      '&:hover': { bgcolor: 'var(--primary)', color: '#fff' }
                    }}
                  />
                );
              })}
            </Stack>
          </Box>
          <Box sx={{
            bgcolor: 'var(--surface-dark)',
            borderRadius: '24px',
            p: 3,
            border: '1px solid var(--border-dark)',
            mt: 3
          }}>
            <Typography variant="h6" sx={{ color: 'var(--text-white)', fontWeight: 800, mb: 3 }}>
              Popüler Kullanıcılar
            </Typography>

            <Stack direction="row" justifyContent="space-around" spacing={1}>
              {popularUsers.map((user) => (
                <Box
                  key={user.id}
                  onClick={() => navigate(`/user/${user.username}`)}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      '& .MuiAvatar-root': {
                        borderColor: 'var(--primary)',
                        boxShadow: '0 0 15px rgba(13, 166, 242, 0.4)'
                      }
                    }
                  }}
                >
                  <Avatar
                    src={getFullUrl(user.profileImageUrl)}
                    sx={{
                      width: 60,
                      height: 60,
                      mb: 1.5,
                      border: '2px solid transparent',
                      bgcolor: 'var(--bg-dark)',
                      fontSize: '1.2rem',
                      fontWeight: 800
                    }}
                  >
                    {user.username[0].toUpperCase()}
                  </Avatar>

                  <Typography
                    variant="caption"
                    sx={{
                      color: 'var(--text-white)',
                      fontWeight: 700,
                      maxWidth: '80px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    @{user.username}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        </Grid>
      </Grid>

      <Menu
        anchorEl={sortAnchorEl}
        open={isSortMenuOpen}
        onClose={() => handleSortClose()}
        slotProps={{
          paper: {
            sx: {
              bgcolor: 'var(--surface-dark)',
              border: '1px solid var(--border-dark)',
              color: 'var(--text-white)',
              mt: 1,
              '& .MuiMenuItem-root': { fontSize: '0.85rem', fontWeight: 600, py: 1.2 }
            }
          }
        }}
      >
        <MenuItem onClick={() => handleSortClose('date')} sx={{ color: sortBy === 'date' ? 'var(--primary)' : 'inherit' }}>En Yeni</MenuItem>
        <MenuItem onClick={() => handleSortClose('rating')} sx={{ color: sortBy === 'rating' ? 'var(--primary)' : 'inherit' }}>En Çok Puan Alana Göre</MenuItem>
        <MenuItem onClick={() => handleSortClose('comments')} sx={{ color: sortBy === 'comments' ? 'var(--primary)' : 'inherit' }}>En Çok Yorum Alana Göre</MenuItem>
        <MenuItem onClick={() => handleSortClose('likes')} sx={{ color: sortBy === 'likes' ? 'var(--primary)' : 'inherit' }}>En Çok Beğeni Alana Göre</MenuItem>
      </Menu>

      <ShareBasketModal open={isModalOpen} onClose={() => { setIsModalOpen(false); fetchInitialData(); }} />
    </Container>
  );
};

export default Home;
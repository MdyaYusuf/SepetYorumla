import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
  Button
} from '@mui/material';
import StorefrontIcon from '@mui/icons-material/Storefront';
import InventoryIcon from '@mui/icons-material/Inventory';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { BasketService } from '../api/basketService';
import BasketFeedCard from '../components/shared/BasketFeedCard';
import { useAppSelector, useAppDispatch } from '../store/store';
import { setCurrentBasket } from '../features/basket/basketSlice';

const BasketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentBasket: basket } = useAppSelector((state) => state.baskets);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBasketDetail = async () => {

      if (!id) {

        return;
      }
      try {
        const response = await BasketService.getById(id);

        if (response.data && response.data.id) {
          dispatch(setCurrentBasket(response.data));
        }
      } catch (error) {
        // The axios interceptor already handles the toast notification
      } finally {
        setIsLoading(false);
      }
    };

    fetchBasketDetail();

    return () => {
      dispatch(setCurrentBasket(null));
    };
  }, [id, dispatch]);

  if (isLoading) {

    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress size={40} sx={{ color: 'var(--primary)' }} />
      </Box>
    );
  }

  if (!basket) {

    return <Typography sx={{ color: 'white', textAlign: 'center', mt: 5 }}>Sepet bulunamadı.</Typography>;
  }

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        sx={{ mb: 1.5, '& .MuiBreadcrumbs-separator': { color: 'var(--text-muted)' } }}
      >
        <MuiLink
          onClick={() => navigate('/home')}
          underline="hover"
          sx={{ color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}
        >
          Ana Sayfa
        </MuiLink>
        <Typography sx={{ color: 'var(--text-white)', fontSize: '0.75rem', fontWeight: 700 }}>{basket.title}</Typography>
      </Breadcrumbs>

      <Button
        startIcon={<ArrowBackIcon sx={{ fontSize: '1rem' }} />}
        onClick={() => navigate(-1)}
        sx={{
          mb: 2,
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

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <BasketFeedCard basket={basket} isDetailView={true} />
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Box sx={{ position: { lg: 'sticky' }, top: 20 }}>
            <Typography variant="subtitle1" sx={{ color: 'var(--text-white)', fontWeight: 800, mb: 1.5 }}>
              Ürün Teknik Detayları
            </Typography>

            <Stack spacing={1.5}>
              {basket.products.map((product, idx) => {
                const hasTechInfo = !!(product.brand?.trim() || product.model?.trim() || product.storeName?.trim() || product.description?.trim());

                return (
                  <Paper key={idx} sx={{ p: 2, bgcolor: 'var(--surface-dark)', border: '1px solid var(--border-dark)', borderRadius: '16px' }}>
                    <Typography variant="body2" sx={{ color: 'var(--primary)', fontWeight: 800, mb: 1 }}>
                      {product.name}
                    </Typography>

                    <Stack spacing={0.8}>
                      {hasTechInfo ? (
                        <>
                          {(product.brand || product.model) && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <InventoryIcon sx={{ color: 'var(--text-muted)', fontSize: 16 }} />
                              <Typography variant="caption" sx={{ color: 'var(--text-white)' }}>
                                <strong>Marka ve Model:</strong> {[product.brand, product.model].filter(Boolean).join(' ')}
                              </Typography>
                            </Box>
                          )}

                          {product.storeName && (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <StorefrontIcon sx={{ color: 'var(--text-muted)', fontSize: 16 }} />
                              <Typography variant="caption" sx={{ color: 'var(--text-white)' }}>
                                <strong>Mağaza:</strong> {product.storeName}
                              </Typography>
                            </Box>
                          )}

                          <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', my: 0.5 }} />

                          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.4 }}>
                            {product.description || "Açıklama belirtilmemiş."}
                          </Typography>
                        </>
                      ) : (
                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontStyle: 'italic', py: 0.5, textAlign: 'center', display: 'block' }}>
                          Teknik bilgi girilmemiş.
                        </Typography>
                      )}

                      <Typography variant="subtitle2" sx={{ color: 'var(--text-white)', fontWeight: 900, textAlign: 'right', mt: 0.5 }}>
                        {product.price.toLocaleString('tr-TR')} TL
                      </Typography>
                    </Stack>
                  </Paper>
                );
              })}

              <Box sx={{ p: 2, bgcolor: 'rgba(13, 166, 242, 0.05)', borderRadius: '16px', border: '1px dashed var(--primary)', textAlign: 'center' }}>
                <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', fontSize: '0.7rem' }}>
                  Sepet Toplam Tutarı
                </Typography>
                <Typography variant="h6" sx={{ color: 'var(--primary)', fontWeight: 900 }}>
                  {basket.products.reduce((sum, p) => sum + p.price, 0).toLocaleString('tr-TR')} TL
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BasketDetailPage;
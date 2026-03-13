import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Button, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import BasketCard from '../shared/BasketCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { BasketResponseDto } from '../../models/Basket';
import { BasketService } from '../../api/basketService';

const FeaturedBaskets: React.FC = () => {
  const [baskets, setBaskets] = useState<BasketResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBaskets = async () => {
      try {
        const response = await BasketService.getAll();

        const topRated = [...response.data]
          .sort((a, b) => (Number(b.averageRating) || 0) - (Number(a.averageRating) || 0))
          .slice(0, 3);

        setBaskets(topRated);
      } catch (error) {
        // The axios interceptor already handles the toast notification
      } finally {
        setIsLoading(false);
      }
    };

    fetchBaskets();
  }, []);

  return (
    <Box id="featured-baskets" sx={{ py: 10, bgcolor: 'var(--bg-dark)' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
          <Box>
            <Typography variant="h4" sx={{ color: 'var(--text-white)', fontWeight: 800, mb: 1 }}>
              Öne Çıkan Sepetler
            </Typography>
            <Typography sx={{ color: 'var(--text-muted)' }}>
              Topluluğun en yüksek puan verdiği sepetler.
            </Typography>
          </Box>
          <Button
            component={RouterLink}
            to="/register"
            endIcon={<ArrowForwardIcon />}
            sx={{
              color: 'var(--primary)',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' }
            }}
          >
            Daha Fazlası İçin Üye Ol
          </Button>
        </Box>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
            <CircularProgress color="primary" />
          </Box>
        ) : (
          <Grid container spacing={4}>
            {baskets.map((basket) => (
              <Grid key={basket.id} size={{ xs: 12, sm: 6, md: 4 }}>
                <BasketCard basket={basket} />
              </Grid>
            ))}
            {baskets.length === 0 && (
              <Typography sx={{ color: 'var(--text-muted)', textAlign: 'center', width: '100%', py: 5 }}>
                Henüz paylaşılmış bir sepet bulunamadı.
              </Typography>
            )}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default FeaturedBaskets;
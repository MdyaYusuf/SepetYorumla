import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Grid, Button, CircularProgress } from '@mui/material';
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
        setBaskets(response.data.slice(0, 3));
      } catch (error) {
        // The axios interceptor already handles the toast notification
      } finally {
        setIsLoading(false);
      }
    };

    fetchBaskets();
  }, []);

  return (
    <Box sx={{ py: 10, bgcolor: 'var(--bg-dark)' }}>
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 5 }}>
          <Box>
            <Typography variant="h4" sx={{ color: 'var(--text-white)', fontWeight: 800, mb: 1 }}>
              Öne Çıkan Sepetler
            </Typography>
            <Typography sx={{ color: 'var(--text-muted)' }}>
              Topluluğun en çok beğendiği sepetler.
            </Typography>
          </Box>
          <Button
            endIcon={<ArrowForwardIcon />}
            sx={{ color: 'var(--primary)', textTransform: 'none', fontWeight: 700 }}
          >
            Hepsini Gör
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
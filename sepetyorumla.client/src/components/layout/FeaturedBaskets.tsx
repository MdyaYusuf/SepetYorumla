import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import BasketCard from '../shared/BasketCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import type { Basket } from '../../models/Basket';

const FeaturedBaskets: React.FC = () => {
  const sampleBaskets: Basket[] = [
    {
      id: "1",
      title: "Gece Rutini: Lüks Cilt Bakım Sepetim",
      userId: "selin-1",
      username: "SelinGlow",
      userProfileImageUrl: "https://i.pravatar.cc/150?u=selin",
      createdDate: new Date().toISOString(),
      products: [
        { id: "p1", name: "Gece Kremi", price: 1250, categoryName: "Kozmetik" },
        { id: "p2", name: "Serum", price: 3000, categoryName: "Kozmetik" }
      ]
    },
    {
      id: "2",
      title: "Ultimate 4K Gaming & Yayıncı Kurulumu",
      userId: "tech-1",
      username: "TechMaster",
      userProfileImageUrl: "https://i.pravatar.cc/150?u=tech",
      createdDate: new Date().toISOString(),
      products: [
        { id: "p3", name: "RTX 4090", price: 82000, categoryName: "Elektronik" },
        { id: "p4", name: "4K Monitor", price: 30000, categoryName: "Elektronik" }
      ]
    },
    {
      id: "3",
      title: "Sokak Stili: 2026 Kış Koleksiyonu",
      userId: "moda-1",
      username: "ModaIkonu",
      userProfileImageUrl: "https://i.pravatar.cc/150?u=moda",
      createdDate: new Date().toISOString(),
      products: [
        { id: "p5", name: "Kışlık Parka", price: 5400, categoryName: "Moda" },
        { id: "p6", name: "Bot", price: 3500, categoryName: "Moda" }
      ]
    },
  ];

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

        <Grid container spacing={4}>
          {sampleBaskets.map((basket) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={basket.id}>
              <BasketCard basket={basket} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedBaskets;
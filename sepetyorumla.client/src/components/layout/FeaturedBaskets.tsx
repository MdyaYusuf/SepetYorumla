import React from 'react';
import { Box, Container, Typography, Grid, Button } from '@mui/material';
import BasketCard from '../shared/BasketCard';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const FeaturedBaskets: React.FC = () => {
  const sampleBaskets = [
    {
      id: 1,
      title: "Gece Rutini: Lüks Cilt Bakım Sepetim",
      user: "SelinGlow",
      price: "4.250 TL",
      commentCount: 28,
      rating: 4.9,
      image: "/night-care.webp",
      tags: ["Kozmetik"]
    },
    {
      id: 2,
      title: "Ultimate 4K Gaming & Yayıncı Kurulumu",
      user: "TechMaster",
      price: "112.000 TL",
      commentCount: 156,
      rating: 4.8,
      image: "/gaming-setup.webp",
      tags: ["Elektronik Eşyalar"]
    },
    {
      id: 3,
      title: "Sokak Stili: 2026 Kış Koleksiyonu",
      user: "ModaIkonu",
      price: "8.900 TL",
      commentCount: 42,
      rating: 4.5,
      image: "/winter-collection.jpg",
      tags: ["Moda"]
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
              <BasketCard {...basket} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default FeaturedBaskets;
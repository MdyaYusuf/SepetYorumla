import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, Divider, Stack, Grid, Rating } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SellIcon from '@mui/icons-material/Sell';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import type { BasketResponseDto } from '../../models/Basket';

interface BasketCardProps {
  basket: BasketResponseDto;
}

const BasketCard: React.FC<BasketCardProps> = ({ basket }) => {
  const API_BASE_URL = "http://localhost:5222";
  const totalPrice = basket.products.reduce((sum: number, product) => sum + product.price, 0);
  const tags: string[] = Array.from(new Set(basket.products.map((p) => p.categoryName).filter(Boolean)));

  const productImages = basket.products
    .map(p => p.imageUrl ? (p.imageUrl.startsWith('http') ? p.imageUrl : `${API_BASE_URL}${p.imageUrl}`) : null)
    .filter((url): url is string => !!url);

  return (
    <Card
      sx={{
        bgcolor: 'var(--surface-dark)',
        border: '1px solid var(--border-dark)',
        borderRadius: '24px',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          borderColor: 'var(--primary)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.4)'
        }
      }}
    >
      <CardContent sx={{ p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar src={basket.userProfileImageUrl} sx={{ width: 24, height: 24, border: '1px solid rgba(255,255,255,0.1)' }}>
              {basket.username[0]}
            </Avatar>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 600 }}>
              {basket.username}
            </Typography>
          </Stack>
          <Rating value={basket.averageRating} precision={0.5} size="small" readOnly sx={{ color: '#ffc107' }} />
        </Box>

        <Box sx={{ flexGrow: 1, mb: 1 }}>
          <Typography
            variant="h6"
            sx={{
              color: 'var(--text-white)',
              fontWeight: 700,
              mb: 0.5,
              lineHeight: 1.3,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              height: '2.6em',
            }}
          >
            {basket.title}
          </Typography>

          <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', mb: 1.5, fontSize: '0.65rem', fontStyle: 'italic' }}>
            İçerik: {basket.products.map(p => p.name).join(', ')}
          </Typography>

          <Box sx={{ borderRadius: '12px', overflow: 'hidden', mb: 2, bgcolor: 'rgba(0,0,0,0.2)' }}>
            <Grid container spacing={0.5}>
              {productImages.slice(0, 3).map((img, idx) => (
                <Grid key={idx} size={4}>
                  <Box component="img" src={img} sx={{ width: '100%', height: 60, objectFit: 'cover', display: 'block' }} />
                </Grid>
              ))}
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
            {tags.length > 0 ? (
              tags.map((tag) => (
                <Chip key={tag} label={tag} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.65rem', height: '20px' }} />
              ))
            ) : (
              <Chip label="Genel" size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.65rem', height: '20px' }} />
            )}
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'var(--border-dark)', mb: 2, mt: 'auto' }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Stack direction="row" spacing={1.5} alignItems="center" sx={{ color: 'var(--text-muted)' }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <ThumbUpOffAltIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{basket.totalThumbsUp}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <ThumbDownOffAltIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{basket.totalThumbsDown}</Typography>
            </Stack>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <ChatBubbleOutlineIcon sx={{ fontSize: 16 }} />
              <Typography variant="caption" sx={{ fontWeight: 600 }}>{basket.totalComments}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" spacing={0.5} alignItems="center" sx={{ color: 'var(--primary)' }}>
            <SellIcon sx={{ fontSize: 18 }} />
            <Typography sx={{ fontWeight: 800 }}>
              {totalPrice.toLocaleString('tr-TR')} TL
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BasketCard;
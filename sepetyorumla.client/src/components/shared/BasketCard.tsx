import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, Divider } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SellIcon from '@mui/icons-material/Sell';
import StarIcon from '@mui/icons-material/Star';
import type { Basket } from '../../models/Basket';

interface BasketCardProps {
  basket: Basket;
}

const BasketCard: React.FC<BasketCardProps> = ({ basket }) => {
  const totalPrice = basket.products.reduce((sum, product) => sum + product.price, 0);

  const tags = Array.from(new Set(basket.products.map(p => p.categoryName)));

  const rating = 4.8;
  const commentCount = 5;

  return (
    <Card
      sx={{
        bgcolor: 'var(--surface-dark)',
        border: '1px solid var(--border-dark)',
        borderRadius: '20px',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: 'var(--primary)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.4)'
        }
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar
              src={basket.userProfileImageUrl}
              sx={{ width: 24, height: 24, bgcolor: 'var(--primary)', fontSize: '0.75rem' }}
            >
              {basket.username[0]}
            </Avatar>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 600 }}>
              {basket.username}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ color: '#ffc107', fontSize: 16 }} />
            <Typography variant="caption" sx={{ color: '#ffc107', fontWeight: 700 }}>
              {rating.toFixed(1)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 1, height: '50px', overflow: 'hidden' }}>
          {basket.title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, mb: 2, flexWrap: 'wrap' }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontSize: '0.65rem', height: '20px' }}
            />
          ))}
        </Box>

        <Divider sx={{ borderColor: 'var(--border-dark)', my: 2 }} />

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--primary)' }}>
            <SellIcon sx={{ fontSize: 18 }} />
            <Typography sx={{ fontWeight: 800 }}>
              {totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--text-muted)' }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
            <Typography variant="caption" sx={{ fontWeight: 600 }}>{commentCount}</Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BasketCard;
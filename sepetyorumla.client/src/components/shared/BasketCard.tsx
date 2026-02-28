import React from 'react';
import { Card, CardContent, Typography, Box, Avatar, Chip, Divider, CardMedia } from '@mui/material';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SellIcon from '@mui/icons-material/Sell';
import StarIcon from '@mui/icons-material/Star';

interface BasketCardProps {
  title: string;
  user: string;
  price: string;
  commentCount: number;
  rating: number;
  image: string;
  tags: string[];
}

const BasketCard: React.FC<BasketCardProps> = ({ title, user, price, commentCount, rating, image, tags }) => {
  return (
    <Card
      sx={{
        bgcolor: 'var(--surface-dark)',
        border: '1px solid var(--border-dark)',
        borderRadius: '20px',
        overflow: 'hidden',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          borderColor: 'var(--primary)',
          boxShadow: '0 12px 30px rgba(0,0,0,0.4)'
        }
      }}
    >
      <CardMedia
        component="img"
        height="200"
        image={image}
        alt={title}
        sx={{ objectFit: 'cover' }}
      />

      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ width: 24, height: 24, bgcolor: 'var(--primary)', fontSize: '0.75rem' }}>
              {user[0]}
            </Avatar>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontWeight: 600 }}>
              {user}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <StarIcon sx={{ color: '#ffc107', fontSize: 16 }} />
            <Typography variant="caption" sx={{ color: '#ffc107', fontWeight: 700 }}>
              {rating.toFixed(1)}
            </Typography>
          </Box>
        </Box>

        <Typography variant="h6" sx={{ color: 'var(--text-white)', fontWeight: 700, mb: 1, lineHeight: 1.2, height: '50px', overflow: 'hidden' }}>
          {title}
        </Typography>

        <Box sx={{ display: 'flex', gap: 0.5, mb: 2 }}>
          {tags.map((tag, index) => (
            <Chip
              key={index}
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
            <Typography sx={{ fontWeight: 800 }}>{price}</Typography>
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
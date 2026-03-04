import React from 'react';
import { Paper, Box, Avatar, Typography, IconButton, ImageList, ImageListItem, Chip, Divider, Stack } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PaymentsIcon from '@mui/icons-material/Payments';
import type { Basket } from '../../models/Basket';

interface BasketFeedCardProps {
  basket: Basket;
}

const BasketFeedCard: React.FC<BasketFeedCardProps> = ({ basket }) => {
  const totalPrice = basket.products.reduce((sum, product) => sum + product.price, 0);

  const images = basket.products.map((_, idx) => `https://picsum.photos/400/400?random=${basket.id}${idx}`);

  const mainCategory = basket.products[0]?.categoryName || 'Genel';

  return (
    <Paper sx={{ p: 2.5, borderRadius: '24px', bgcolor: 'var(--surface-dark)', border: '1px solid var(--border-dark)', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar src={basket.userProfileImageUrl} sx={{ width: 48, height: 48, border: '2px solid rgba(13, 166, 242, 0.2)' }}>
            {basket.username[0]}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'var(--text-white)' }}>
              {basket.username}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
              {new Date(basket.createdDate).toLocaleDateString('tr-TR')} • {mainCategory}
            </Typography>
          </Box>
        </Stack>
        <IconButton size="small"><MoreVertIcon sx={{ color: 'var(--text-muted)' }} /></IconButton>
      </Box>

      {/* Title */}
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'var(--text-white)' }}>
        {basket.title}
      </Typography>

      <Box sx={{ borderRadius: '16px', overflow: 'hidden', mb: 2 }}>
        <ImageList sx={{ margin: 0 }} cols={images.length > 3 ? 4 : images.length} gap={8}>
          {images.slice(0, 4).map((img, idx) => (
            <ImageListItem key={idx} sx={{ position: 'relative' }}>
              <img src={img} alt="Product" style={{ aspectRatio: '1/1', objectFit: 'cover' }} />
              {idx === 3 && images.length > 4 && (
                <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h6" sx={{ color: '#fff', fontWeight: 800 }}>+{images.length - 4}</Typography>
                </Box>
              )}
            </ImageListItem>
          ))}
        </ImageList>
      </Box>

      <Chip
        icon={<PaymentsIcon style={{ fontSize: 18, color: 'inherit' }} />}
        label={`Toplam: ${totalPrice.toLocaleString('tr-TR')} TL`}
        sx={{ bgcolor: 'rgba(13, 166, 242, 0.1)', color: 'var(--primary)', fontWeight: 800, borderRadius: 'full', mb: 2 }}
      />

      <Divider sx={{ borderColor: 'var(--border-dark)', my: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={3}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--text-muted)', cursor: 'pointer', '&:hover': { color: '#ff4b4b' } }}>
            <FavoriteBorderIcon fontSize="small" />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>0</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--text-muted)', cursor: 'pointer', '&:hover': { color: 'var(--primary)' } }}>
            <ChatBubbleOutlineIcon fontSize="small" />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>0</Typography>
          </Box>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--text-muted)', cursor: 'pointer' }}>
          <BookmarkBorderIcon fontSize="small" /> <Typography variant="caption" sx={{ fontWeight: 700 }}>Kaydet</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default BasketFeedCard;
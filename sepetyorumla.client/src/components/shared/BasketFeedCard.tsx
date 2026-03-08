import React, { useState } from 'react';
import { Paper, Box, Avatar, Typography, IconButton, Grid, Chip, Divider, Stack, Tooltip, Rating } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PaymentsIcon from '@mui/icons-material/Payments';
import type { BasketResponseDto } from '../../models/Basket';
import { ReviewService } from '../../api/reviewService';

interface BasketFeedCardProps {
  basket: BasketResponseDto;
}

const BasketFeedCard: React.FC<BasketFeedCardProps> = ({ basket }) => {
  const API_BASE_URL = "http://localhost:5222";
  const totalPrice = basket.products.reduce((sum, p) => sum + p.price, 0);
  const tags = Array.from(new Set(basket.products.map(p => p.categoryName).filter(Boolean)));

  const [avgRating, setAvgRating] = useState<number>(Number(basket.averageRating) || 0);
  const [ratingsCount, setRatingsCount] = useState<number>(basket.totalRatingsCount || 0);
  const [likesCount, setLikesCount] = useState(basket.totalThumbsUp);
  const [dislikesCount, setDislikesCount] = useState(basket.totalThumbsDown);
  const [commentsCount] = useState(basket.totalComments);

  const [userStarRating, setUserStarRating] = useState<number | null>(basket.userStarRating);
  const [isThumbsUp, setIsThumbsUp] = useState<boolean | null>(basket.userThumbsUp);

  const productImages = basket.products
    .map(p => p.imageUrl ? (p.imageUrl.startsWith('http') ? p.imageUrl : `${API_BASE_URL}${p.imageUrl}`) : null)
    .filter((url): url is string => !!url);

  const handleRatingChange = async (newStars: number | null) => {
    if (newStars === null) {

      return;
    }

    const oldUserStars = userStarRating;
    const oldAvg = avgRating;
    const oldCount = ratingsCount;

    let nextCount = oldCount;
    let nextAvg: number;

    if (oldUserStars === null) {
      nextCount = oldCount + 1;
      nextAvg = ((oldAvg * oldCount) + newStars) / nextCount;
    } else {
      nextAvg = ((oldAvg * oldCount) - oldUserStars + newStars) / oldCount;
    }

    setAvgRating(nextAvg);
    setRatingsCount(nextCount);
    setUserStarRating(newStars);

    try {
      await ReviewService.upsert({
        basketId: basket.id,
        starRating: newStars,
        isThumbsUp: null
      });
    } catch {
      setAvgRating(oldAvg);
      setRatingsCount(oldCount);
      setUserStarRating(oldUserStars);
    }
  };

  const handleVote = async (up: boolean) => {
    if (isThumbsUp === up) {

      return;
    }

    const oldVote = isThumbsUp;
    setIsThumbsUp(up);

    if (up === true) {
      setLikesCount(prev => prev + 1);

      if (oldVote === false) {
        setDislikesCount(prev => Math.max(0, prev - 1));
      }
    } else {
      setDislikesCount(prev => prev + 1);

      if (oldVote === true) {
        setLikesCount(prev => Math.max(0, prev - 1));
      }
    }

    try {
      await ReviewService.upsert({
        basketId: basket.id,
        starRating: null,
        isThumbsUp: up
      });
    } catch {
      setIsThumbsUp(oldVote);
      setLikesCount(basket.totalThumbsUp);
      setDislikesCount(basket.totalThumbsDown);
    }
  };

  return (
    <Paper sx={{ p: 2.5, borderRadius: '24px', bgcolor: 'var(--surface-dark)', border: '1px solid var(--border-dark)', mb: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Avatar src={basket.userProfileImageUrl} sx={{ width: 40, height: 40, border: '1px solid rgba(255,255,255,0.1)' }}>
            {basket.username[0]}
          </Avatar>
          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'var(--text-white)' }}>
              {basket.username}
            </Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)' }}>
              {new Date(basket.createdDate).toLocaleDateString('tr-TR')}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#ffc107' }}>
            {avgRating.toFixed(1)}
          </Typography>
          <Rating
            value={avgRating}
            precision={0.5}
            size="small"
            onChange={(_, val) => handleRatingChange(val)}
            sx={{ color: '#ffc107' }}
          />
          <IconButton size="small"><MoreVertIcon sx={{ color: 'var(--text-muted)' }} /></IconButton>
        </Stack>
      </Box>

      <Tooltip title={basket.title} placement="top-start" arrow>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: 'var(--text-white)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', lineHeight: 1.3, minHeight: '2.6em' }}>
          {basket.title}
        </Typography>
      </Tooltip>

      <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', mb: 2, fontStyle: 'italic' }}>
        İçerik: {basket.products.map(p => p.name).join(', ')}
      </Typography>

      <Box sx={{ borderRadius: '16px', overflow: 'hidden', mb: 2, bgcolor: 'rgba(0,0,0,0.2)' }}>
        <Grid container spacing={1}>
          {productImages.slice(0, 3).map((img, idx) => (
            <Grid key={idx} size={productImages.length === 1 ? 12 : productImages.length === 2 ? 6 : 4}>
              <Box component="img" src={img} sx={{ width: '100%', height: 140, objectFit: 'cover', display: 'block' }} />
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {tags.map((tag) => <Chip key={tag} label={tag} size="small" sx={{ bgcolor: 'rgba(255,255,255,0.05)', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.7rem' }} />)}
        </Box>
        <Chip icon={<PaymentsIcon style={{ fontSize: 16, color: 'inherit' }} />} label={`Toplam: ${totalPrice.toLocaleString('tr-TR')} TL`} size="small" sx={{ bgcolor: 'rgba(13, 166, 242, 0.1)', color: 'var(--primary)', fontWeight: 800 }} />
      </Box>

      <Box sx={{ p: 1.5, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', mb: 2 }}>
        <Stack direction="row" spacing={1} alignItems="flex-start">
          <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: 'var(--primary)' }}>A</Avatar>
          <Box>
            <Typography variant="caption" sx={{ color: 'var(--text-white)', fontWeight: 700, display: 'block' }}>@asli_deneme</Typography>
            <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontStyle: 'italic', lineHeight: 1.2 }}>"Harika bir sepet olmuş! Ürünleri nereden aldın?"</Typography>
          </Box>
        </Stack>
      </Box>

      <Divider sx={{ borderColor: 'var(--border-dark)', mb: 2 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Stack direction="row" spacing={2.5}>
          <Box onClick={() => handleVote(true)} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: isThumbsUp === true ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', '&:hover': { color: 'var(--primary)' } }}>
            {isThumbsUp === true ? <ThumbUpIcon fontSize="small" /> : <ThumbUpOffAltIcon fontSize="small" />}
            <Typography variant="caption" sx={{ fontWeight: 700 }}>{likesCount}</Typography>
          </Box>

          <Box onClick={() => handleVote(false)} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: isThumbsUp === false ? '#ff4b4b' : 'var(--text-muted)', cursor: 'pointer', '&:hover': { color: '#ff4b4b' } }}>
            {isThumbsUp === false ? <ThumbDownIcon fontSize="small" /> : <ThumbDownOffAltIcon fontSize="small" />}
            <Typography variant="caption" sx={{ fontWeight: 700 }}>{dislikesCount}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'var(--text-muted)', cursor: 'pointer', '&:hover': { color: 'var(--primary)' } }}>
            <ChatBubbleOutlineIcon fontSize="small" />
            <Typography variant="caption" sx={{ fontWeight: 700 }}>{commentsCount}</Typography>
          </Box>
        </Stack>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'var(--text-muted)', cursor: 'pointer' }}>
          <BookmarkBorderIcon fontSize="small" />
          <Typography variant="caption" sx={{ fontWeight: 700 }}>Kaydet</Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default BasketFeedCard;
import React, { useEffect, useState } from 'react';
import { Paper, Box, Avatar, Typography, IconButton, Grid, Chip, Divider, Stack, Tooltip, Rating, TextField, CircularProgress } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
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
import type { CommentResponseDto } from '../../models/Comment';
import { CommentService } from '../../api/commentService';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';

interface BasketFeedCardProps {
  basket: BasketResponseDto;
}

const BasketFeedCard: React.FC<BasketFeedCardProps> = ({ basket }) => {
  const API_BASE_URL = "http://localhost:5222";
  const totalPrice = basket.products.reduce((sum, p) => sum + p.price, 0);
  const tags = Array.from(new Set(basket.products.map(p => p.categoryName).filter(Boolean)));
  const navigate = useNavigate();

  const [avgRating, setAvgRating] = useState<number>(Number(basket.averageRating) || 0);
  const [ratingsCount, setRatingsCount] = useState<number>(Number(basket.totalRatingsCount) || 0);
  const [likesCount, setLikesCount] = useState(Number(basket.totalThumbsUp) || 0);
  const [dislikesCount, setDislikesCount] = useState(Number(basket.totalThumbsDown) || 0);
  const [commentsCount, setCommentsCount] = useState(Number(basket.totalComments) || 0);
  const { user } = useAppSelector((state) => state.auth);
  const [userStarRating, setUserStarRating] = useState<number | null>(
    basket.userStarRating != null ? Number(basket.userStarRating) : null
  );
  const [isThumbsUp, setIsThumbsUp] = useState<boolean | null>(basket.userThumbsUp);
  const [comments, setComments] = useState<CommentResponseDto[]>([]);
  const [newCommentText, setNewCommentText] = useState('');
  const [isCommentsLoading, setIsCommentsLoading] = useState(false);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      setIsCommentsLoading(true);
      try {
        const response = await CommentService.getByBasketId(basket.id);
        if (response.data.success) {
          setComments(response.data.data);
        }
      } catch (error) {
        // The axios interceptor already handles the toast notification
      } finally {
        setIsCommentsLoading(false);
      }
    };

    fetchComments();
  }, [basket.id]);

  const productImages = basket.products
    .map(p => p.imageUrl ? (p.imageUrl.startsWith('http') ? p.imageUrl : `${API_BASE_URL}${p.imageUrl}`) : null)
    .filter((url): url is string => !!url);

  const handleRatingChange = async (val: number | null) => {
    if (val === null) {

      return;
    }

    const currentInput = Math.round(val * 2) / 2;
    const oldUserStars = userStarRating !== null ? Number(userStarRating) : null;
    const oldAvg = Number(avgRating) || 0;
    const oldCount = Number(ratingsCount) || 0;

    let nextCount = oldCount;
    let rawAvg: number;

    if (oldUserStars === null) {
      nextCount = oldCount + 1;
      rawAvg = oldCount === 0
        ? currentInput
        : (oldAvg * oldCount + currentInput) / nextCount;
    } else {
      rawAvg = oldCount > 1
        ? (oldAvg * oldCount - oldUserStars + currentInput) / oldCount
        : currentInput;
    }

    const safeAvg = isNaN(rawAvg) || !isFinite(rawAvg) ? currentInput : rawAvg;
    setAvgRating(safeAvg);
    setRatingsCount(nextCount);
    setUserStarRating(currentInput);

    try {
      await ReviewService.upsert({
        basketId: basket.id,
        starRating: currentInput,
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
      if (oldVote === false) setDislikesCount(prev => Math.max(0, prev - 1));
    } else {
      setDislikesCount(prev => prev + 1);
      if (oldVote === true) setLikesCount(prev => Math.max(0, prev - 1));
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

  const handleAddComment = async () => {
    if (!newCommentText.trim()) {

      return;
    }

    try {
      const response = await CommentService.add({
        text: newCommentText,
        basketId: basket.id
      });

      if (response.data.success) {
        setNewCommentText('');
        const updated = await CommentService.getByBasketId(basket.id);
        setComments(updated.data.data);
        setCommentsCount(prev => prev + 1);
      }
    } catch (error) {
      // The axios interceptor already handles the toast notification
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    try {
      const response = await CommentService.delete(commentId);
      if (response.data.success) {
        setComments(prev => prev.filter(c => c.id !== commentId));
        setCommentsCount(prev => prev - 1);
      }
    } catch (error) {
      // The axios interceptor already handles the toast notification
    }
  };

  const goToDetail = () => navigate(`/basket/${basket.id}`);

  return (
    <Paper
      onClick={goToDetail}
      sx={{
        p: 2.5,
        borderRadius: '24px',
        bgcolor: 'var(--surface-dark)',
        border: '1px solid var(--border-dark)',
        mb: 3,
        cursor: 'pointer',
        transition: 'transform 0.2s ease, border-color 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          borderColor: 'var(--primary)'
        }
      }}
    >
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

        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          onClick={(e) => e.stopPropagation()}
        >
          <Typography variant="caption" sx={{ fontWeight: 800, color: '#ffc107' }}>
            {avgRating.toFixed(1)}
          </Typography>
          <Rating
            value={userStarRating}
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

      {showComments && (
        <Box sx={{ mt: 2, mb: 2 }} onClick={(e) => e.stopPropagation()}>
          <Divider sx={{ borderColor: 'var(--border-dark)', mb: 2 }} />

          {isCommentsLoading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 1 }}><CircularProgress size={20} /></Box>
          ) : (
            <>
              {comments.length === 0 && (
                <Typography variant="caption" sx={{ color: 'var(--text-muted)', display: 'block', textAlign: 'center', mb: 2, fontStyle: 'italic' }}>
                  Henüz yorum yok. İlk yorumu sen yap!
                </Typography>
              )}

              {comments.length > 0 && (
                <Box key={comments[comments.length - 1].id} sx={{ p: 1.2, borderRadius: '12px', bgcolor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', mb: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="flex-start" justifyContent="space-between">
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <Avatar sx={{ width: 24, height: 24, fontSize: '0.7rem', bgcolor: 'var(--primary)' }}>
                        {comments[comments.length - 1].username[0]}
                      </Avatar>
                      <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="caption" sx={{ color: 'var(--text-white)', fontWeight: 700 }}>
                            @{comments[comments.length - 1].username}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'var(--text-muted)', fontSize: '0.65rem' }}>
                            {new Date(comments[comments.length - 1].createdDate).toLocaleDateString('tr-TR')}
                          </Typography>
                        </Stack>
                        <Typography variant="caption" sx={{ color: 'var(--text-muted)', lineHeight: 1.2 }}>
                          {comments[comments.length - 1].text}
                        </Typography>
                      </Box>
                    </Stack>

                    {user?.id === comments[comments.length - 1].userId && (
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteComment(comments[comments.length - 1].id)}
                        sx={{ color: 'var(--text-muted)', '&:hover': { color: '#ff4b4b' } }}
                      >
                        <DeleteIcon sx={{ fontSize: '0.9rem' }} />
                      </IconButton>
                    )}
                  </Stack>
                </Box>
              )}

              {comments.length > 0 && (
                <Typography
                  variant="caption"
                  sx={{ color: 'var(--primary)', cursor: 'pointer', fontWeight: 700, mb: 1, display: 'block', ml: 1, '&:hover': { textDecoration: 'underline' } }}
                  onClick={goToDetail}
                >
                  {comments.length > 1 ? `Tüm ${comments.length} yorumu gör ve detaya git...` : "Detaya git..."}
                </Typography>
              )}
            </>
          )}

          <Box sx={{ display: 'flex', mt: 2, gap: 1 }}>
            <TextField
              fullWidth
              size="small"
              placeholder="Yorum yap..."
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              sx={{
                '& .MuiOutlinedInput-root': {
                  color: 'white',
                  bgcolor: 'rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  '& fieldset': { borderColor: 'transparent' },
                  '&:hover fieldset': { borderColor: 'rgba(255,255,255,0.1)' },
                }
              }}
            />
            <IconButton onClick={handleAddComment} color="primary" sx={{ bgcolor: 'rgba(13, 166, 242, 0.1)' }}>
              <SendIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      )}

      <Divider sx={{ borderColor: 'var(--border-dark)', mb: 2 }} />

      <Box
        sx={{ display: 'flex', justifyContent: 'space-between' }}
        onClick={(e) => e.stopPropagation()}
      >
        <Stack direction="row" spacing={2.5}>
          <Box onClick={() => handleVote(true)} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: isThumbsUp === true ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', '&:hover': { color: 'var(--primary)' } }}>
            {isThumbsUp === true ? <ThumbUpIcon fontSize="small" /> : <ThumbUpOffAltIcon fontSize="small" />}
            <Typography variant="caption" sx={{ fontWeight: 700 }}>{likesCount}</Typography>
          </Box>

          <Box onClick={() => handleVote(false)} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: isThumbsUp === false ? '#ff4b4b' : 'var(--text-muted)', cursor: 'pointer', '&:hover': { color: '#ff4b4b' } }}>
            {isThumbsUp === false ? <ThumbDownIcon fontSize="small" /> : <ThumbDownOffAltIcon fontSize="small" />}
            <Typography variant="caption" sx={{ fontWeight: 700 }}>{dislikesCount}</Typography>
          </Box>

          <Box
            onClick={() => setShowComments(!showComments)}
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: showComments ? 'var(--primary)' : 'var(--text-muted)', cursor: 'pointer', '&:hover': { color: 'var(--primary)' } }}
          >
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
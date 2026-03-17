import React from 'react';
import { Box, Container, Typography, Stack, Button, Grid } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import ForumIcon from '@mui/icons-material/Forum';
import StarRateIcon from '@mui/icons-material/StarRate';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import LinkIcon from '@mui/icons-material/Link';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import GroupIcon from '@mui/icons-material/Group';
import BasketFeedImg from '../assets/basket-feed.png';
import BasketDetailImg from '../assets/basket-detail.png';
import SavedBasketsImg from '../assets/saved-baskets.png';
import ProfilePageImg from '../assets/profile-page.png';

const IntroPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#101c22', minHeight: '100vh', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: 'hidden' }}>
      <Navbar />

      <main>
        <Box sx={{ pt: { xs: 12, md: 22 }, pb: { xs: 10, md: 20 }, position: 'relative', textAlign: 'center', overflow: 'hidden' }}>
          <Box sx={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', background: `radial-gradient(circle at 50% 50%, rgba(13, 166, 242, 0.08) 0%, transparent 60%)`, filter: 'blur(80px)' }} />

          <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1, px: 2, py: 0.5, borderRadius: '20px', bgcolor: 'rgba(13, 166, 242, 0.1)', border: '1px solid rgba(13, 166, 242, 0.2)', mb: 4 }}>
              <ShoppingBasketIcon sx={{ color: '#0da6f2', fontSize: 16 }} />
              <Typography variant="caption" sx={{ color: '#0da6f2', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                YENİ ALIŞVERİŞ DENEYİMİ
              </Typography>
            </Box>
            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, mb: 3, lineHeight: 1.1, letterSpacing: '-2px' }}>
              SepetYorumla Dünyasını <br /><span style={{ color: '#0da6f2' }}>Keşfedin</span>
            </Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '650px', mx: 'auto', mb: 8, lineHeight: 1.7 }}>
              Alışveriş deneyiminizi sosyal bir yolculuğa dönüştürün. Sepetlerinizi paylaşın, ilham alın ve toplulukla etkileşime geçin.
            </Typography>

            <Stack alignItems="center" spacing={1} sx={{ opacity: 0.8 }}>
              <Typography sx={{ fontWeight: 800, color: '#0da6f2', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
                Keşfetmeye Başla
              </Typography>
              <KeyboardArrowDownIcon sx={{
                fontSize: 40,
                color: '#0da6f2',
                animation: 'bounce 2s infinite',
                '@keyframes bounce': {
                  '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
                  '40%': { transform: 'translateY(-10px)' },
                  '60%': { transform: 'translateY(-5px)' },
                }
              }} />
            </Stack>
          </Container>
        </Box>

        <Box sx={{ py: 12, bgcolor: 'rgba(24, 40, 48, 0.3)' }}>
          <Container maxWidth="lg">
            <Grid container spacing={10} alignItems="center">
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>Topluluğa Katılın</Typography>
                <Box sx={{ width: '60px', height: '4px', bgcolor: '#0da6f2', borderRadius: '2px', mb: 4 }} />
                <Typography sx={{ color: '#94a3b8', fontSize: '1.15rem', lineHeight: 1.8, mb: 6 }}>
                  Canlı akışımızda diğer kullanıcıların sepetlerini görün. Yorum yapın, beğenin ve puanlama sistemiyle en iyi alışverişleri öne çıkarın.
                </Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 4 }}>
                    <FeatureSmallCard icon={<StarRateIcon />} title="Yıldızlar" />
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <FeatureSmallCard icon={<FavoriteIcon />} title="Beğeniler" />
                  </Grid>
                  <Grid size={{ xs: 4 }}>
                    <FeatureSmallCard icon={<ForumIcon />} title="Yorumlar" />
                  </Grid>
                </Grid>
              </Grid>
              <Grid size={{ xs: 12, md: 7 }}>
                <Box component="img" src={BasketFeedImg} alt="Basket feed" sx={{ width: '100%', height: 'auto', borderRadius: '24px', border: '1px solid rgba(13, 166, 242, 0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: 12 }}>
          <Container maxWidth="lg">
            <Grid container spacing={10} alignItems="center">
              <Grid size={{ xs: 12, md: 7 }}>
                <Box component="img" src={BasketDetailImg} alt="Basket detail" sx={{ width: '100%', height: 'auto', borderRadius: '24px', border: '1px solid rgba(13, 166, 242, 0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>Sepetleri İnceleyin</Typography>
                <Box sx={{ width: '60px', height: '4px', bgcolor: '#0da6f2', borderRadius: '2px', mb: 4 }} />
                <Typography sx={{ color: '#94a3b8', fontSize: '1.15rem', lineHeight: 1.8, mb: 6 }}>
                  Her sepetin derinliklerine inin. Ürün özelliklerini, market karşılaştırmalarını ve kullanıcı tavsiyelerini detaylı görünümde inceleyin.
                </Typography>
                <Stack spacing={4}>
                  <DetailFeatureRow icon={<AssignmentIcon />} title="Ürün Teknik Detayları" desc="Marka ve model bilgilerini detaylıca görün." />
                  <DetailFeatureRow icon={<QuestionAnswerIcon />} title="Kullanıcı Yorumları" desc="Gerçek deneyimlere dayalı tavsiyeleri okuyun." />
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: 12, bgcolor: 'rgba(24, 40, 48, 0.3)' }}>
          <Container maxWidth="lg">
            <Grid container spacing={10} alignItems="center">
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>Kaydedin ve Paylaşın</Typography>
                <Box sx={{ width: '60px', height: '4px', bgcolor: '#0da6f2', borderRadius: '2px', mb: 4 }} />
                <Typography sx={{ color: '#94a3b8', fontSize: '1.15rem', lineHeight: 1.8, mb: 6 }}>
                  Beğendiğiniz sepetleri koleksiyonunuza kaydedin veya arkadaşlarınızla özel linkler üzerinden paylaşın.
                </Typography>
                <Stack direction="row" spacing={3}>
                  <ActionIconBox icon={<BookmarkIcon />} label="Kaydet" />
                  <ActionIconBox icon={<ShareIcon />} label="Paylaş" />
                  <ActionIconBox icon={<LinkIcon />} label="Bağlantı" />
                </Stack>
              </Grid>
              <Grid size={{ xs: 12, md: 7 }}>
                <Box component="img" src={SavedBasketsImg} alt="Saved baskets" sx={{ width: '100%', height: 'auto', borderRadius: '24px', border: '1px solid rgba(13, 166, 242, 0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} />
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: 12 }}>
          <Container maxWidth="lg">
            <Grid container spacing={10} alignItems="center">
              <Grid size={{ xs: 12, md: 7 }}>
                <Box component="img" src={ProfilePageImg} alt="Profile preview" sx={{ width: '100%', height: 'auto', borderRadius: '24px', border: '1px solid rgba(13, 166, 242, 0.1)', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' }} />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography variant="h2" sx={{ fontWeight: 800, mb: 3 }}>Profillere Göz Atın</Typography>
                <Box sx={{ width: '60px', height: '4px', bgcolor: '#0da6f2', borderRadius: '2px', mb: 4 }} />
                <Typography sx={{ color: '#94a3b8', fontSize: '1.15rem', lineHeight: 1.8, mb: 6 }}>
                  Diğer kullanıcıların dünyasına konuk olun. Favori küratörlerinizi takip edin, başarılarını görün ve topluluk içindeki etkileşimlerini keşfedin.
                </Typography>
                <Stack spacing={4}>
                  <DetailFeatureRow icon={<GroupIcon />} title="Sosyal Takip Sistemi" desc="Diğer kullanıcıları takip ederek haberdar olun." />
                  <DetailFeatureRow icon={<QuestionAnswerIcon />} title="Son Yorumlar" desc="Kullanıcıların son yorumlarını inceleyin." />
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: 10, background: 'radial-gradient(circle at 50% 120%, rgba(13, 166, 242, 0.12) 0%, transparent 60%)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          <Container maxWidth="md">
            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-1px' }}>Alışverişin Sosyal Haline Hazır Mısınız?</Typography>
            <Typography sx={{ color: '#94a3b8', fontSize: '1.1rem', mb: 5, maxWidth: '600px', mx: 'auto' }}>
              Binlerce kullanıcı sepetlerini paylaşıyor, yorumluyor ve akıllı alışverişin keyfini çıkarıyor.
            </Typography>
            <Button component={RouterLink} to="/register" variant="contained" sx={{ bgcolor: '#0da6f2', color: '#fff', borderRadius: '100px', px: 8, py: 2, fontWeight: 900, fontSize: '1.1rem', textTransform: 'none', boxShadow: '0 10px 40px rgba(13, 166, 242, 0.3)', '&:hover': { bgcolor: '#0b8ed1' } }}>
              Üye Ol
            </Button>
          </Container>
        </Box>
      </main>

      <Footer />
    </Box>
  );
};

const FeatureSmallCard = ({ icon, title }: { icon: any, title: string }) => (
  <Box sx={{ p: 2, borderRadius: '20px', bgcolor: 'rgba(24, 40, 48, 0.8)', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center', transition: '0.3s', '&:hover': { transform: 'translateY(-10px)', borderColor: '#0da6f2', bgcolor: 'rgba(13, 166, 242, 0.03)' } }}>
    <Box sx={{ color: '#0da6f2', mb: 1, display: 'flex', justifyContent: 'center' }}>{icon}</Box>
    <Typography sx={{ fontWeight: 800, color: '#fff', fontSize: '0.85rem' }}>{title}</Typography>
  </Box>
);

const DetailFeatureRow = ({ icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <Stack direction="row" spacing={3} alignItems="center">
    <Box sx={{ width: 56, height: 56, borderRadius: '16px', bgcolor: 'rgba(13, 166, 242, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0da6f2', flexShrink: 0 }}>
      {icon}
    </Box>
    <Box>
      <Typography sx={{ fontWeight: 800, color: '#fff', mb: 0.5, fontSize: '1.1rem' }}>{title}</Typography>
      <Typography variant="body2" sx={{ color: '#94a3b8' }}>{desc}</Typography>
    </Box>
  </Stack>
);

const ActionIconBox = ({ icon, label }: { icon: any, label: string }) => (
  <Stack alignItems="center" spacing={1.5}>
    <Box sx={{ width: 64, height: 64, borderRadius: '20px', bgcolor: 'rgba(24, 40, 48, 1)', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0da6f2', transition: '0.3s', '&:hover': { transform: 'translateY(-5px)', borderColor: '#0da6f2', bgcolor: 'rgba(13, 166, 242, 0.05)' } }}>
      {icon}
    </Box>
    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: 800 }}>{label}</Typography>
  </Stack>
);

export default IntroPage;
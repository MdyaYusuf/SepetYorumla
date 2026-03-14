import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Stack,
  Button,
  IconButton
} from '@mui/material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import PsychologyIcon from '@mui/icons-material/Psychology';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import AboutIllustration from '../assets/about-page-illustration.png';

const AboutPage: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: '#101c22',
        minHeight: '100vh',
        color: '#fff',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        overflowX: 'hidden'
      }}
    >
      <Navbar />

      <main>
        <Box
          sx={{
            pt: { xs: 8, md: 12 },
            pb: { xs: 8, md: 12 },
            background: 'radial-gradient(circle at 50% -20%, #1e3a4a 0%, #101c22 70%)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Container maxWidth="md">
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                background: `
                  radial-gradient(circle at 20% 60%, rgba(13, 166, 242, 0.05) 0%, transparent 50%), 
                  radial-gradient(circle at 50% 40%, rgba(13, 166, 242, 0.08) 0%, transparent 60%), 
                  radial-gradient(circle at 80% 65%, rgba(13, 166, 242, 0.05) 0%, transparent 50%)
                `,
                filter: 'blur(60px)',
                opacity: 0.6
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  display: 'inline-flex',
                  gap: 1,
                  px: 2,
                  py: 0.5,
                  borderRadius: '20px',
                  bgcolor: 'rgba(13, 166, 242, 0.1)',
                  border: '1px solid rgba(13, 166, 242, 0.2)',
                  mb: 4
                }}
              >
                <RocketLaunchIcon sx={{ color: 'var(--primary)', fontSize: 18 }} />
                <Typography
                  variant="caption"
                  sx={{
                    color: '#0da6f2',
                    fontWeight: 800,
                    letterSpacing: '1px'
                  }}
                >
                  VİZYONUMUZ & MİSYONUMUZ
                </Typography>
              </Box>

              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '2.5rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 3,
                  lineHeight: 1.1
                }}
              >
                Alışverişin <span style={{ color: '#0da6f2' }}>Sosyal Hali:</span><br />SepetYorumla
              </Typography>

              <Typography
                sx={{
                  color: '#94a3b8',
                  fontSize: '1.1rem',
                  maxWidth: '750px',
                  mx: 'auto',
                  mb: 0,
                  lineHeight: 1.7
                }}
              >
                SepetYorumla, alışveriş tutkunlarını bir araya getiren, sepet paylaşımı ve ürün değerlendirme odaklı yeni nesil bir sosyal medya platformudur.
              </Typography>
            </Box>
          </Container>
        </Box>

        <Box sx={{ py: 12, bgcolor: 'rgba(24, 40, 48, 0.3)' }}>
          <Container maxWidth="lg">
            <Grid container spacing={8} alignItems="center">
              <Grid size={{ xs: 12, md: 4.2 }}>
                <Box
                  component="img"
                  src={AboutIllustration}
                  alt="SepetYorumla"
                  sx={{
                    width: '100%',
                    height: 'auto',
                    borderRadius: '32px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    display: 'block'
                  }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 7.8 }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 4 }}>
                  Biz Kimiz?
                </Typography>
                <Typography
                  sx={{
                    color: '#94a3b8',
                    lineHeight: 1.8,
                    mb: 6,
                    fontSize: '1.1rem'
                  }}
                >
                  SepetYorumla, dijital alışveriş deneyimini bireysellikten çıkarıp kolektif bir bilgi paylaşımına dönüştürmek için kuruldu. Topluluğun gücüyle tasarruf yapmanızı sağlıyoruz.
                </Typography>

                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <HoverValueBox
                      icon={<MonetizationOnIcon />}
                      title="Bütçe Dostu"
                      desc="Fırsatlarla tasarruf yapın."
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <HoverValueBox
                      icon={<ModeCommentIcon />}
                      title="Geri Bildirimler"
                      desc="Deneyimlerinizi paylaşın."
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 4 }}>
                    <HoverValueBox
                      icon={<PsychologyIcon />}
                      title="Akıllı Seçimler"
                      desc="Bilinçli kararlar verin."
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Box>

        <Box sx={{ py: 10, borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <Container maxWidth="lg">
            <Grid container spacing={4} textAlign="center">
              <StatItem value="500K+" label="AKTİF KULLANICI" />
              <StatItem value="1M+" label="PAYLAŞILAN SEPET" />
              <StatItem value="50K+" label="GÜNLÜK YORUM" />
              <StatItem value="4.8" label="APP STORE PUANI" />
            </Grid>
          </Container>
        </Box>

        <Box
          sx={{
            py: { xs: 8, md: 12 },
            background: 'radial-gradient(circle at 50% 110%, rgba(30, 58, 74, 0.3) 0%, #101c22 80%)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                background: `
                  radial-gradient(circle at 20% 40%, rgba(13, 166, 242, 0.02) 0%, transparent 50%), 
                  radial-gradient(circle at 80% 45%, rgba(13, 166, 242, 0.02) 0%, transparent 50%)
                `,
                filter: 'blur(40px)'
              }}
            />
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, letterSpacing: '-1.5px' }}>
                Bize Ulaşın
              </Typography>
              <Typography
                sx={{
                  color: '#94a3b8',
                  fontSize: '1.05rem',
                  maxWidth: '550px',
                  mx: 'auto',
                  mb: 8,
                  lineHeight: 1.6
                }}
              >
                Platformumuz hakkında sorularınız mı var? Ya da iş birliği yapmak mı istiyorsunuz? Ekibimizle hızlıca iletişime geçin.
              </Typography>

              <Grid container spacing={4} justifyContent="center" alignItems="center">
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack
                    direction="row"
                    spacing={2.5}
                    justifyContent={{ xs: 'center', md: 'flex-end' }}
                  >
                    <SocialLink icon={<LinkedInIcon />} url="https://linkedin.com" />
                    <SocialLink icon={<InstagramIcon />} url="https://instagram.com" />
                    <SocialLink icon={<FacebookIcon />} url="https://facebook.com" />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack
                    direction="column"
                    alignItems={{ xs: 'center', md: 'flex-start' }}
                    spacing={1}
                  >
                    <Button
                      variant="contained"
                      href="https://wa.me/905000000000"
                      target="_blank"
                      sx={{
                        bgcolor: '#25D366',
                        color: '#fff',
                        px: 4.5,
                        py: 1.8,
                        borderRadius: '30px 15px 30px 15px',
                        fontWeight: 800,
                        fontSize: '1rem',
                        textTransform: 'none',
                        boxShadow: '0 8px 30px rgba(37, 211, 102, 0.1)',
                        transition: '0.3s ease',
                        '&:hover': {
                          bgcolor: '#20bd5a',
                          transform: 'scale(1.03)'
                        }
                      }}
                    >
                      WhatsApp ile Bağlan
                    </Button>
                    <Box sx={{ width: '100%', maxWidth: '240px', textAlign: 'center' }}>
                      <Typography
                        variant="caption"
                        sx={{
                          color: '#64748b',
                          fontWeight: 800,
                          letterSpacing: '0.5px'
                        }}
                      >
                        CEVAP SÜRESİ: &lt; 10 DAKİKA
                      </Typography>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Container>
        </Box>
      </main>

      <Footer />
    </Box>
  );
};

const HoverValueBox = ({ icon, title, desc }: { icon: React.ReactElement; title: string; desc: string }) => (
  <Box
    sx={{
      p: 3,
      borderRadius: '24px',
      bgcolor: 'rgba(24, 40, 48, 0.6)',
      border: '1px solid rgba(13, 166, 242, 0.1)',
      height: '100%',
      color: '#94a3b8',
      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      cursor: 'default',
      '&:hover': {
        color: '#fff',
        transform: 'translateY(-8px)',
        bgcolor: 'rgba(13, 166, 242, 0.05)',
        borderColor: '#0da6f2',
        boxShadow: '0 10px 30px rgba(13, 166, 242, 0.15)',
        '& .icon-wrapper': {
          bgcolor: 'rgba(13, 166, 242, 0.1)',
          color: '#0da6f2',
          transform: 'scale(1.1)',
          boxShadow: '0 0 20px rgba(13, 166, 242, 0.2)'
        }
      }
    }}
  >
    <Box
      className="icon-wrapper"
      sx={{
        width: 54,
        height: 54,
        borderRadius: '16px',
        bgcolor: 'rgba(255, 255, 255, 0.03)',
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 2.5,
        transition: 'all 0.3s ease',
        '& svg': { fontSize: 28 }
      }}
    >
      {icon}
    </Box>
    <Typography sx={{ fontWeight: 800, mb: 1, color: '#fff' }}>{title}</Typography>
    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>{desc}</Typography>
  </Box>
);

const SocialLink = ({ icon, url }: { icon: any; url: string }) => (
  <IconButton
    href={url}
    target="_blank"
    sx={{
      width: 52,
      height: 52,
      border: '1px solid rgba(255,255,255,0.1)',
      color: '#fff',
      transition: 'all 0.3s ease',
      '&:hover': {
        bgcolor: 'rgba(13, 166, 242, 0.1)',
        borderColor: '#0da6f2',
        color: '#0da6f2',
        transform: 'scale(1.1)'
      }
    }}
  >
    {icon}
  </IconButton>
);

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <Grid size={{ xs: 6, md: 3 }}>
    <Typography variant="h4" sx={{ color: '#0da6f2', fontWeight: 800, mb: 1 }}>
      {value}
    </Typography>
    <Typography
      variant="caption"
      sx={{ color: '#64748b', fontWeight: 700, letterSpacing: '1px' }}
    >
      {label}
    </Typography>
  </Grid>
);

export default AboutPage;
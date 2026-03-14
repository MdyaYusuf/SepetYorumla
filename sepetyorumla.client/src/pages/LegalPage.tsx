import React from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Stack
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import GavelIcon from '@mui/icons-material/Gavel';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const LegalPage: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#101c22', minHeight: '100vh', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      <Navbar />

      <main>
        <Container maxWidth="md" sx={{ py: { xs: 8, md: 15 } }}>

          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                px: 2,
                py: 0.5,
                borderRadius: '20px',
                bgcolor: 'rgba(13, 166, 242, 0.1)',
                border: '1px solid rgba(13, 166, 242, 0.2)',
                mb: 4
              }}
            >
              <GavelIcon sx={{ color: '#0da6f2', fontSize: 16 }} />
              <Typography variant="caption" sx={{ color: '#0da6f2', fontWeight: 800, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Yasal Bilgilendirme
              </Typography>
            </Box>

            <Typography variant="h1" sx={{ fontSize: { xs: '2.5rem', md: '4rem' }, fontWeight: 900, mb: 3, letterSpacing: '-1px' }}>
              Kullanım Koşulları
            </Typography>

            <Typography sx={{ color: '#94a3b8', fontSize: '1.1rem', maxWidth: '600px', mx: 'auto', lineHeight: 1.7 }}>
              Lütfen platformumuzu kullanmadan önce bu şartları dikkatlice okuyunuz. SepetYorumla'ya erişerek bu koşulları kabul etmiş sayılırsınız.
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>

            <StyledAccordion defaultExpanded>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#94a3b8' }} />}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Typography sx={{ fontWeight: 800, color: '#0da6f2', bgcolor: 'rgba(13, 166, 242, 0.1)', px: 1.5, py: 0.5, borderRadius: '8px', fontSize: '0.85rem' }}>01</Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', py: 1 }}>Genel Şartlar</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ borderTop: '1px solid rgba(13, 166, 242, 0.1)', mt: 2, pt: 3, px: 4, pb: 4 }}>
                <Typography sx={{ color: '#94a3b8', lineHeight: 1.8 }}>
                  SepetYorumla platformuna erişim sağlayarak veya sunulan hizmetleri kullanarak, işbu Kullanım Koşulları’nın tamamını okuduğunuzu, anladığınızı ve bu şartlara bağlı kalacağınızı kabul etmiş sayılırsınız. Hizmetlerimiz olduğu gibi esasıyla sunulmaktadır. SepetYorumla, platformun kapsamını, teknik özelliklerini, üyelik yapısını veya bu metinde yer alan maddeleri, kullanıcılara önceden bildirimde bulunmaksızın dilediği zaman değiştirme veya durdurma hakkını saklı tutar. Platformu kullanmaya devam etmeniz, güncel şartları kabul ettiğiniz anlamına gelir. 18 yaşından küçük kullanıcılar, platformu ancak veli veya vasi gözetiminde kullanabilirler.
                </Typography>
              </AccordionDetails>
            </StyledAccordion>

            <StyledAccordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#94a3b8' }} />}>
                <Stack direction="row" spacing={3} alignItems="center">
                  <Typography sx={{ fontWeight: 800, color: '#0da6f2', bgcolor: 'rgba(13, 166, 242, 0.1)', px: 1.5, py: 0.5, borderRadius: '8px', fontSize: '0.85rem' }}>02</Typography>
                  <Typography sx={{ fontWeight: 800, fontSize: '1.2rem', py: 1 }}>Kullanıcı Sorumlulukları</Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ borderTop: '1px solid rgba(13, 166, 242, 0.1)', mt: 2, pt: 3, px: 4, pb: 4 }}>
                <Typography sx={{ color: '#94a3b8', lineHeight: 1.8, mb: 2 }}>
                  Kullanıcılar, platform üzerinde oluşturdukları profillerden, paylaştıkları sepetlerden ve yaptıkları yorumlardan bizzat ve tek başına sorumludur. Paylaşılan içeriklerin küfür, hakaret, argo, tehdit, aşağılama veya üçüncü şahısların kişilik haklarını ihlal eden ifadeler içermesi kesinlikle yasaktır. Bu tür içeriklerden kaynaklanabilecek her türlü hukuki, idari ve cezai sorumluluk doğrudan içeriği paylaşan kullanıcıya aittir. SepetYorumla bu içerikler nedeniyle sorumlu tutulamaz. Ayrıca kullanıcılar başkalarını taciz etmemeyi, yanıltıcı ve reklam amaçlı içerik paylaşmamayı ve platformun teknik güvenliğini tehlikeye atacak işlemlerden kaçınmayı taahhüt eder. İhlal durumunda SepetYorumla, ilgili içeriği kaldırma ve kullanıcı hesabını kısıtlama veya sonlandırma hakkına sahiptir.
                </Typography>
              </AccordionDetails>
            </StyledAccordion>

          </Box>
        </Container>
      </main>

      <Footer />
    </Box>
  );
};

const StyledAccordion = ({ children, ...props }: any) => (
  <Accordion
    disableGutters
    elevation={0}
    square={false}
    {...props}
    sx={{
      bgcolor: 'rgba(24, 40, 48, 0.6)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(13, 166, 242, 0.1)',
      borderRadius: '16px !important',
      overflow: 'hidden',
      '&:before': { display: 'none' },
      '&.Mui-expanded': {
        boxShadow: '0 0 25px rgba(13, 166, 242, 0.1)',
        borderColor: 'rgba(13, 166, 242, 0.3)'
      }
    }}
  >
    {children}
  </Accordion>
);

export default LegalPage;
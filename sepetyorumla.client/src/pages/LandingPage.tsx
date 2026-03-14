import Hero from '../components/layout/Hero';
import FeaturedBaskets from '../components/layout/FeaturedBaskets';
import HowItWorks from '../components/layout/HowItWorks';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const LandingPage = () => {

  return (
    <>
      <Navbar />
      <Hero />
      <FeaturedBaskets />
      <HowItWorks />
      <Footer />
    </>
  );
};

export default LandingPage;
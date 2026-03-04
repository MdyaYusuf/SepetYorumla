import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../features/authentication/Login';
import Register from '../features/authentication/Register';
import Home from '../features/feed/Home';

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />

    </Routes>
  );
};

export default AppRoutes;
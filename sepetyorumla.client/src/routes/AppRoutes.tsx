import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import { Box, CircularProgress } from '@mui/material';
import LandingPage from '../pages/LandingPage';
import Login from '../features/authentication/Login';
import Register from '../features/authentication/Register';
import Home from '../features/feed/Home';
import type { JSX } from 'react';
import BasketDetailPage from '../pages/BasketDetailPage';
import Settings from '../pages/Settings';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

const AppRoutes = () => {
  const { isInitialized } = useSelector((state: RootState) => state.auth);

  if (!isInitialized) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress color="primary" />
      </Box>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/settings" element={<Settings />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/basket/:id"
        element={
          <ProtectedRoute>
            <BasketDetailPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
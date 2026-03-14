import { createBrowserRouter, Navigate, Outlet, ScrollRestoration } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';
import LandingPage from '../pages/LandingPage';
import Login from '../features/authentication/Login';
import Register from '../features/authentication/Register';
import Home from '../features/feed/Home';
import type { ReactNode } from 'react';
import BasketDetailPage from '../pages/BasketDetailPage';
import Settings from '../pages/Settings';
import ProfilePage from '../pages/ProfilePage';
import NotFoundPage from '../pages/NotFoundPage';
import AboutPage from '../pages/AboutPage';
import IntroPage from '../pages/IntroPage';
import LegalPage from '../pages/LegalPage';

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (!isAuthenticated) {

    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};

const PublicOnlyRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  if (isAuthenticated) {

    return <Navigate to="/home" />;
  }

  return <>{children}</>;
};

const RootLayout = () => {
  return (
    <>
      <ScrollRestoration />
      <Outlet />
    </>
  );
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />
      },
      {
        path: 'about',
        element: <AboutPage />
      },
      {
        path: 'intro',
        element: <IntroPage />
      },
      {
        path: 'legal',
        element: <LegalPage />
      },
      {
        path: 'login',
        element: <PublicOnlyRoute><Login /></PublicOnlyRoute>
      },
      {
        path: 'register',
        element: <PublicOnlyRoute><Register /></PublicOnlyRoute>
      },
      {
        path: 'home',
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        )
      },
      {
        path: 'profile',
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        )
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        )
      },
      {
        path: 'basket/:id',
        element: (
          <ProtectedRoute>
            <BasketDetailPage />
          </ProtectedRoute>
        )
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
]);
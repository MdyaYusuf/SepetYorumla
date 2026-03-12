import React, { useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  ListItemIcon,
  List,
  ListItem,
  ListItemButton,
  Divider
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { useLocation, useNavigate } from 'react-router-dom';
import { logout } from '../../features/authentication/authSlice';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { getFullUrl } from '../../helpers/imageHelper';
import { requests } from '../../api/axiosInstance';

const Sidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    try {
      await requests.post("Authentication/logout", {});
    } catch {
      // The axios interceptor already handles the toast notification
    } finally {
      dispatch(logout());
      setAnchorEl(null);
      navigate('/');
    }
  };

  const handleSettingsClick = () => {
    navigate('/settings');
    setAnchorEl(null);
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', py: 3 }}>
      <Box>
        <Box
          onClick={() => navigate('/home')}
          sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, px: 2, cursor: 'pointer' }}
        >
          <ShoppingBasketIcon sx={{ color: 'var(--primary)', fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
            SepetYorumla
          </Typography>
        </Box>

        <List sx={{ px: 1 }}>
          <SidebarItem
            icon={<HomeIcon />}
            label="Ana Sayfa"
            onClick={() => navigate('/home')}
            active={location.pathname === '/home'}
          />
          <SidebarItem
            icon={<PersonIcon />}
            label="Profilim"
            onClick={handleProfileClick}
            active={location.pathname === '/profile'}
          />
        </List>
      </Box>

      <Box>
        <Box
          sx={{
            p: 1.5,
            borderRadius: '16px',
            bgcolor: 'rgba(255,255,255,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            transition: 'all 0.2s ease',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
          }}
        >
          <Box
            onClick={handleProfileClick}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              flex: 1,
              minWidth: 0,
              cursor: 'pointer'
            }}
          >
            <Avatar
              src={getFullUrl(user?.profileImageUrl)}
              sx={{ bgcolor: 'var(--primary)', width: 40, height: 40 }}
            >
              {!user?.profileImageUrl && (user?.username?.[0].toUpperCase() || 'U')}
            </Avatar>

            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" noWrap sx={{ color: '#fff', fontWeight: 700 }}>
                {user?.username || 'Kullanıcı'}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: 'var(--text-muted)', display: 'block' }}>
                @{user?.username?.toLowerCase() || 'sepetsever'}
              </Typography>
            </Box>
          </Box>

          <Box
            onClick={handleOpen}
            sx={{
              p: 0.5,
              borderRadius: '8px',
              display: 'flex',
              cursor: 'pointer',
              '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            <MoreHorizIcon sx={{ color: 'var(--text-muted)' }} />
          </Box>
        </Box>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          disableScrollLock
          autoFocus={false}
          disableRestoreFocus
          slotProps={{
            paper: {
              sx: {
                bgcolor: 'var(--surface-dark)',
                color: '#fff',
                border: '1px solid var(--border-dark)',
                borderRadius: '12px',
                mb: 1,
                minWidth: 200,
                boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
              }
            }
          }}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          transformOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <MenuItem onClick={handleSettingsClick} sx={{ py: 1.2 }}>
            <ListItemIcon><SettingsIcon fontSize="small" sx={{ color: 'var(--text-muted)' }} /></ListItemIcon>
            Ayarlar
          </MenuItem>
          <Divider sx={{ borderColor: 'var(--border-dark)' }} />
          <MenuItem onClick={handleLogout} sx={{ color: '#ff4b4b', py: 1.2 }}>
            <ListItemIcon><LogoutIcon fontSize="small" sx={{ color: '#ff4b4b' }} /></ListItemIcon>
            Çıkış Yap
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
};

const SidebarItem = ({ icon, label, onClick, active = false }: { icon: React.ReactNode, label: string, onClick?: () => void, active?: boolean }) => (
  <ListItem disablePadding sx={{ mb: 1 }}>
    <ListItemButton
      onClick={onClick}
      sx={{
        borderRadius: '12px',
        color: active ? 'var(--primary)' : 'var(--text-muted)',
        bgcolor: active ? 'rgba(13, 166, 242, 0.05)' : 'transparent',
        '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
      }}
    >
      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{icon}</ListItemIcon>
      <Typography variant="body1" sx={{ fontWeight: active ? 800 : 600 }}>{label}</Typography>
    </ListItemButton>
  </ListItem>
);

export default Sidebar;
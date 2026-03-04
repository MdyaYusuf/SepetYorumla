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
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/authentication/authSlice';
import type { RootState } from '../../store/store';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (event: React.MouseEvent | React.KeyboardEvent) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    setAnchorEl(null);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', py: 3 }}>
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4, px: 2 }}>
          <ShoppingBasketIcon sx={{ color: 'var(--primary)', fontSize: 32 }} />
          <Typography variant="h6" sx={{ fontWeight: 900, color: '#fff', letterSpacing: '-0.5px' }}>
            SepetYorumla
          </Typography>
        </Box>

        <List sx={{ px: 1 }}>
          <SidebarItem icon={<HomeIcon />} label="Ana Sayfa" active />
          <SidebarItem icon={<ExploreIcon />} label="Keşfet" />
          <SidebarItem icon={<ShoppingBagIcon />} label="Sepetlerim" />
        </List>
      </Box>

      <Box>
        <Box
          onClick={handleOpen}
          sx={{
            p: 1.5,
            borderRadius: '16px',
            bgcolor: 'rgba(255,255,255,0.03)',
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            cursor: 'pointer',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.08)' }
          }}
        >
          <Avatar sx={{ bgcolor: 'var(--primary)', width: 40, height: 40 }}>
            {user?.username?.[0].toUpperCase() || 'U'}
          </Avatar>
          <Box sx={{ flex: 1, minWidth: 0 }}>
            <Typography variant="subtitle2" noWrap sx={{ color: '#fff', fontWeight: 700 }}>
              {user?.username || 'Kullanıcı'}
            </Typography>
            <Typography variant="caption" noWrap sx={{ color: 'var(--text-muted)', display: 'block' }}>
              @{user?.username?.toLowerCase() || 'sepetsever'}
            </Typography>
          </Box>
          <MoreHorizIcon sx={{ color: 'var(--text-muted)' }} />
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
          <MenuItem onClick={() => setAnchorEl(null)} sx={{ py: 1.2 }}>
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

const SidebarItem = ({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) => (
  <ListItem disablePadding sx={{ mb: 1 }}>
    <ListItemButton sx={{
      borderRadius: '12px',
      color: active ? 'var(--primary)' : 'var(--text-muted)',
      bgcolor: active ? 'rgba(13, 166, 242, 0.05)' : 'transparent',
      '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
    }}>
      <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>{icon}</ListItemIcon>
      <Typography variant="body1" sx={{ fontWeight: active ? 800 : 600 }}>{label}</Typography>
    </ListItemButton>
  </ListItem>
);

export default Sidebar;
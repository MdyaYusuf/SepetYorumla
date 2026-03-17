import React from 'react';
import {
  Dialog, DialogTitle, DialogContent, List, ListItem,
  ListItemAvatar, Avatar, ListItemText, Typography,
  IconButton, Box, Divider
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Link } from 'react-router-dom';
import { getFullUrl } from '../../helpers/imageHelper';
import type { UserListItem } from '../../models/User';

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  users: UserListItem[];
  loading: boolean;
}

const UsersListModal: React.FC<Props> = ({ open, onClose, title, users, loading }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="xs"
      slotProps={{
        paper: {
          sx: {
            borderRadius: '24px',
            bgcolor: 'var(--surface-dark)',
            backgroundImage: 'none',
            border: '1px solid var(--border-dark)'
          }
        }
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-white)' }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>{title}</Typography>
        <IconButton onClick={onClose} sx={{ color: 'var(--text-muted)' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <Divider sx={{ borderColor: 'var(--border-dark)' }} />

      <DialogContent sx={{ p: 0, maxHeight: '400px', minHeight: '200px' }}>
        <List sx={{ py: 0 }}>
          {users.length > 0 ? (
            users.map((user) => (
              <ListItem
                key={user.id}
                component={Link}
                to={`/user/${user.username}`}
                onClick={onClose}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  py: 1.5,
                  px: 3,
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: '0.2s',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.05)' }
                }}
              >
                <ListItemAvatar sx={{ minWidth: 'auto' }}>
                  <Avatar
                    src={getFullUrl(user.profileImageUrl)}
                    sx={{ width: 44, height: 44, border: '2px solid var(--bg-dark)' }}
                  >
                    {user.username[0].toUpperCase()}
                  </Avatar>
                </ListItemAvatar>
                <ListItemText>
                  <Typography
                    sx={{
                      color: 'var(--text-white) !important',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textDecoration: 'none'
                    }}
                  >
                    {user.username}
                  </Typography>
                </ListItemText>
              </ListItem>
            ))
          ) : (
            !loading && (
              <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography sx={{ color: 'var(--text-muted)' }}>
                  Henüz kimse yok.
                </Typography>
              </Box>
            )
          )}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default UsersListModal;
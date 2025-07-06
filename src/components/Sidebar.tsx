import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Avatar,
  Divider,
} from '@mui/material';
import {
  Home as HomeIcon,
  History as HistoryIcon,
  Logout as LogoutIcon,
  AutoAwesome as MagicIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useClerk } from '@clerk/clerk-react';

interface SidebarProps {
  mobileOpen: boolean;
  onDrawerToggle: () => void;
  drawerWidth: number;
  currentPage: 'dashboard' | 'history' | 'profile';
  onPageChange: (page: 'dashboard' | 'history' | 'profile') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onDrawerToggle, drawerWidth, currentPage, onPageChange }) => {
  const { signOut } = useClerk();

  const menuItems = [
    { text: 'Dashboard', icon: <HomeIcon />, page: 'dashboard' as const },
    { text: 'History', icon: <HistoryIcon />, page: 'history' as const },
    { text: 'Profile', icon: <PersonIcon />, page: 'profile' as const },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
            <MagicIcon />
          </Avatar>
          <Typography variant="h6" noWrap sx={{ fontWeight: 600 }}>
            Resume AI
          </Typography>
        </Box>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            onClick={() => onPageChange(item.page)}
            sx={{
              bgcolor: currentPage === item.page ? 'action.selected' : 'transparent',
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <ListItemIcon sx={{ color: currentPage === item.page ? 'primary.main' : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      <Divider />
      <List>
        <ListItemButton onClick={() => signOut()}>
          <ListItemIcon>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default Sidebar;
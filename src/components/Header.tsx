import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

interface HeaderProps {
  onMenuToggle: () => void;
  drawerWidth: number;
  currentPage?: 'dashboard' | 'history' | 'profile';
}

const Header: React.FC<HeaderProps> = ({ onMenuToggle, drawerWidth, currentPage = 'dashboard' }) => {
  const getPageTitle = () => {
    switch (currentPage) {
      case 'history':
        return 'Analysis History';
      case 'profile':
        return 'My Profile';
      default:
        return 'Smart Resume Analyzer';
    }
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
        bgcolor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1,
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={onMenuToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {getPageTitle()}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
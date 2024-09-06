"use client";
import { useState } from "react";

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import SearchInput from "./SearchInput";
import CustomDrawer from "./CustomDrawer";
import UserMenu from "./UserMenu";

function TopBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex', height: '65px' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor: '#003055', height: '65px'  }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: 'none' }}
          >
            MUI
          </Typography>
          <SearchInput />
          <UserMenu />
        </Toolbar>
      </AppBar>
      <CustomDrawer
        open={mobileOpen}
        handleToggle={handleDrawerToggle}
      />
    </Box>
  )
};

export default TopBar;
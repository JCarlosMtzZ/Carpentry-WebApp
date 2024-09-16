"use client";
import { useState } from "react";
import Link from "next/link";

import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography } from '@mui/material';

import CategoryIcon from '@mui/icons-material/Category';

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
      <AppBar elevation={0} component="nav" sx={{ height: '65px'  }}>
        <Toolbar>
          <Link
            href={'/'}
          >
            <Typography
              variant="h6"
              component="div"
            >
              MUI
            </Typography>
          </Link>
          <SearchInput />
          <UserMenu />
          <IconButton
            size="small"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1 }}
          >
            <CategoryIcon />
          </IconButton>
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
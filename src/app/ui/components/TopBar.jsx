"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography } from '@mui/material';

import CategoryIcon from '@mui/icons-material/Category';
import HomeIcon from '@mui/icons-material/Home';

import SearchInput from "./SearchInput";
import CustomDrawer from "./CustomDrawer";
import UserMenu from "./UserMenu";

export default function TopBar() {

  const [searchBarExpanded, setSearchBarExpanded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(prevState => !prevState);
  };

  return (
    <Box sx={{ display: 'flex', height: '65px' }}>
      <CssBaseline />
      <AppBar elevation={0} component="nav" sx={{ height: '65px', display: 'flex', justifyContent: 'center'  }}>
        <Toolbar>
          <Link href={'/'} className={`${searchBarExpanded && 'hidden sm:block'}`}>
            <IconButton
              size="medium"
              color="inherit"
              aria-label="home"
              edge="start"
            >
              <HomeIcon fontSize="large" />
            </IconButton>
            </Link>
          <SearchInput
            expanded={searchBarExpanded}
            setExpanded={setSearchBarExpanded}
          />
          <UserMenu />
          <IconButton
            size="medium"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ ml: 1 }}
          >
            <CategoryIcon fontSize="medium" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CustomDrawer
        open={drawerOpen}
        handleToggle={handleDrawerToggle}
      />
    </Box>
  );
};
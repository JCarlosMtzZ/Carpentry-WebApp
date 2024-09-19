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

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [searchBarExpanded, setSearchBarExpanded] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen((prevState) => !prevState);
  };

  return (
    <Box sx={{ display: 'flex', height: '65px' }}>
      <CssBaseline />
      <AppBar elevation={0} component="nav" sx={{ height: '65px'  }}>
        <Toolbar>
          <Link
            href={'/'}
            className={`${searchBarExpanded && 'hidden sm:block'}`}
          >
            <Typography
              variant="h6"
              component="div"
            >
              MUI
            </Typography>
          </Link>
          <SearchInput
            expanded={searchBarExpanded}
            setExpanded={setSearchBarExpanded}
          />
          <UserMenu
          />
          <IconButton
            size="small"
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              ml: 1,
             
            }}
          >
            <CategoryIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <CustomDrawer
        open={drawerOpen}
        handleToggle={handleDrawerToggle}
      />
    </Box>
  )
};

export default TopBar;
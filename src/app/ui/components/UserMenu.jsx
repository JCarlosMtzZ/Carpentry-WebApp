'use client';
import { useState } from "react";
import Link from "next/link";

import IconButton from '@mui/material/IconButton';
import MenuItem from "@mui/material/MenuItem";
import Menu from '@mui/material/Menu';

import AccountCircle from "@mui/icons-material/AccountCircle";

export default function UserMenu() {

  const [anchorEl, setAnchorE1] = useState(null);
  const handleMenu = (e) => {
    setAnchorE1(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  return(
    <div>
      <IconButton
        size="small"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ ml: 1 }}
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <Link href={`/furnitureItem/add`} className='w-full'>
          <MenuItem onClick={handleClose}>Agregar mueble</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Iniciar sesión</MenuItem>
        <Link href={'/favorites'} className='w-full'>
          <MenuItem onClick={handleClose}>Favoritos</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};
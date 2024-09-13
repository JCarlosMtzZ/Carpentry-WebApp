'use client';
import { useState } from "react";
import Link from "next/link";

import IconButton from '@mui/material/IconButton';
import MenuItem from "@mui/material/MenuItem";
import Menu from '@mui/material/Menu';

import AccountCircle from "@mui/icons-material/AccountCircle";

function UserMenu() {

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
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
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
        <Link
          key={1}
          href={`/furnitureItem/add`}
          className='w-full'
        >
          <MenuItem>Agregar mueble</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Iniciar sesión</MenuItem>
        <MenuItem onClick={handleClose}>Favoritos</MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
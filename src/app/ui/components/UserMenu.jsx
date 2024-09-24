'use client';
import { useState } from "react";
import Link from "next/link";
import { signIn, signOut } from 'next-auth/react';

import IconButton from '@mui/material/IconButton';
import MenuItem from "@mui/material/MenuItem";
import Menu from '@mui/material/Menu';

import AccountCircle from "@mui/icons-material/AccountCircle";

export default function UserMenu({ session }) {

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const [anchorEl, setAnchorE1] = useState(null);
  const handleMenu = (e) => {
    setAnchorE1(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorE1(null);
  };

  const handleSignIn = () => {
    handleClose();
    signIn('google', {
      prompt: 'select_account',
      login_hint: ''
    });
  };

  const handleSignOut = () => {
    handleClose();
    signOut({
      redirect: true,
      callbackUrl: '/'
    });
  };

  return(
    <div>
      <IconButton
        size="medium"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
        sx={{ ml: 1 }}
      >
        <AccountCircle fontSize="medium" />
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
        <Link href={`/favorites?page=1`} className='w-full'>
          <MenuItem onClick={handleClose}>Favoritos</MenuItem>
        </Link>
        {session && session.user.email === adminEmail &&
          <div>
            <Link href={`/furnitureItem/add`} className='w-full'>
              <MenuItem onClick={handleClose}>Agregar mueble</MenuItem>
            </Link>
            <MenuItem onClick={handleSignOut}>Cerrar sesión</MenuItem>
          </div> 
        }
        {!session &&
          <MenuItem onClick={handleSignIn}>Iniciar sesión</MenuItem>
        }
      </Menu>
    </div>
  );
};
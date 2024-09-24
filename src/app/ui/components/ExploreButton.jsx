'use client';
import { useState } from "react";
import { Button } from "@mui/material";

import CustomDrawer from "./CustomDrawer";

export default function ExploreButton({ categories }) {
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(prevState => !prevState);
  };

  return (
    <>
      <Button
        onClick={handleDrawerToggle}
        size="large"
        variant="contained"
        sx={{ width: '150px' }}
      >
        Explorar
      </Button>
      <CustomDrawer
        categories={categories}
        open={drawerOpen}
        handleToggle={handleDrawerToggle}
      />
    </>
  );
};
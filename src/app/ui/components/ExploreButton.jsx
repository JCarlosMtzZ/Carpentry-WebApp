'use client';
import { useState } from "react";
import { useCategoriesColors } from "@/app/lib/context/CategoriesColorsContext";
import { Button } from "@mui/material";

import CustomDrawer from "./CustomDrawer";

export default function ExploreButton() {

  const { categories } = useCategoriesColors();
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const handleDrawerToggle = () => {
    setDrawerOpen(prevState => !prevState);
  };

  return (
    <div>
      <CustomDrawer
        categories={categories}
        open={drawerOpen}
        handleToggle={handleDrawerToggle}
        
      />
      <Button
        onClick={handleDrawerToggle}
        size="medium"
        variant="contained"
        sx={{ width: '175px', color: '#003055', backgroundColor: 'white' }}
      >
        Explorar
      </Button>
    </div>
  );
};
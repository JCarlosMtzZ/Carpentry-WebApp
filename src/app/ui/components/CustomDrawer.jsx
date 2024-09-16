import { useState, useEffect } from 'react';

import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Skeleton } from '@mui/material';
import Link from 'next/link';

import { getCategoryIcon } from '@/app/lib/utils';

import { getAllCategories } from '@/app/lib/ajax';


export default function CustomDrawer(props) {
  
  const drawerWidth = 260;
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResult = await getAllCategories();
        setCategories(categoriesResult);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  const { window, open, handleToggle } = props;

  function DrawerItemSkeleton() {
    return (
      <div className='w-full flex items-center gap-2 p-4 shadow-sm'>
        <Skeleton animation='wave' variant='circular' width='40px' height='40px' />
        <Skeleton animation='wave' height='20px' width='50%' />
      </div>
    );
  };

  const drawer = (
    <Box onClick={handleToggle}>
      <List>
        {categories.length > 0 && categories.map(category => (
          <ListItem key={category.id} disablePadding>
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className='w-full'
            >
              <ListItemButton sx={{ display: 'flex', gap: 1, textAlign: 'left' }}>
                <div className='bg-[#003055]/20 flex items-center justify-center w-[40px] h-[40px] p-2 rounded-[50%]'>
                  {getCategoryIcon(category.name)}
                </div>
                <ListItemText primary={category.name} />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <nav>
      <Drawer
        anchor='right'
        container={container}
        variant="temporary"
        open={open}
        onClose={handleToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Typography variant="h6" sx={{ my: 2, textAlign: 'center' }}>
          Categorías
        </Typography>
        <Divider />
        {loading ?
          <div>
            {Array.from({ length: 6 }).map((_, index) => (
              <DrawerItemSkeleton key={index} />
            ))}
          </div>
          :
          <div>
            {drawer}
          </div>
        }
      </Drawer>
    </nav>
  );
};


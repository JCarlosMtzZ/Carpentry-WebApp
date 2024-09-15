import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import { getCategoryIcon } from '@/app/lib/utils';

import { getAllCategories } from '@/app/lib/ajax';

const drawerWidth = 300;

export default function CustomDrawer(props) {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResult = await getAllCategories();
        setCategories(categoriesResult);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);
  
  const { window, open, handleToggle } = props;

  const drawer = (
    <Box onClick={handleToggle} sx={{ textAlign: 'center',  }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Categorías
      </Typography>
      <Divider />
      <List>
        {categories.length > 0 && categories.map(category => (
          <ListItem key={category.id} disablePadding>
            <Link
              key={category.id}
              href={`/category/${category.id}`}
              className='w-full'
            >
              <ListItemButton sx={{ display: 'flex', gap: 1, textAlign: 'left' }}>
                <div className='bg-slate-300 flex items-center justify-center w-[40px] h-[40px] p-2 rounded-[50%]'>
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
        {drawer}
      </Drawer>
    </nav>
  );
};


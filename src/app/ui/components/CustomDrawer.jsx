import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import Link from 'next/link';

import { getCategoryIcon } from '@/app/lib/utils';

export default function CustomDrawer(props) {
  
  const drawerWidth = 260;
  
  const { window, categories, open, handleToggle } = props;

  const drawer = (
    <Box onClick={handleToggle}>
      <List>
        {categories.length > 0 && categories.map(category => (
          <ListItem key={category.id} disablePadding>
            <Link
              key={category.id}
              href={`/category/${category.id}?page=1`}
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
        {drawer}
      </Drawer>
    </nav>
  );
};


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

const drawerWidth = 240;
const navItems = ['Burós', 'Cocinas', 'Cortineros', 'Mesas', 'Pasamanos', 'Puertas', 'Para Sala', 'Ventanas', 'Vitrinas'];

function CustomDrawer(props) {
  
  const { window, open, handleToggle } = props;

  const drawer = (
    <Box onClick={handleToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Categorías
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <Link
              key={item}
              href={`/category/${item}`}
              className='w-full'
            >
              <ListItemButton sx={{ display: 'flex', gap: 1, textAlign: 'left' }}>
                <div className='bg-slate-300 flex items-center justify-center w-[40px] h-[40px] p-2 rounded-[50%]'>
                  {getCategoryIcon(item)}
                </div>
                <ListItemText primary={item} />
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

export default CustomDrawer;


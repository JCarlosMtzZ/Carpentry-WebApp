'use client';
import { useState, useEffect } from 'react';

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';
import { Paper, Button } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';


function FurnitureDetailModal({ open, handleClose, data }) {

  const [isBreakpoint, setIsBreakpoint] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(max-width: 600px)`);
    const handleChange = (e) => {
      setIsBreakpoint(e.matches);
    };
    mediaQuery.addEventListener('change', handleChange);
    setIsBreakpoint(mediaQuery.matches);
    return () => mediaQuery.removeEventListener('change', handleChange);
  });

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', sm: '80%' },
    height: isBreakpoint ? '100vh' : '90vh',
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: isBreakpoint ? 'auto' : 'none'
  };
  
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={modalStyle}>
          <IconButton
            color='info'
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              m: 1,
              zIndex: 10
            }}
          >
            <CloseIcon />
          </IconButton>
          <div className='w-full sm:w-[70%] bg-black'>
            <Carousel
              autoPlay={false}
              animation='slide'
              height={isBreakpoint ? '75vh' : '90vh'}
              indicators={false}
              navButtonsProps={{
                style: {
                  backgroundColor: 'black',
                  color: 'white',
                }
              }}
            >
              {data.images && data.images.map((image) => (
                <div key={image.id} className='relative w-full h-full'>
                  <Image
                    src={process.env.NEXT_PUBLIC_BUCKET_API_URL + image.url}
                    alt=''
                    className='object-contain'
                    fill
                  />
                </div>
              ))}
            </Carousel>
          </div>
          <div className='p-6 w-full sm:w-[30%]'>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {data.name}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              {data.description}
            </Typography>
          </div>
        </Box>
      </Fade>
    </Modal>
  );
};

export default FurnitureDetailModal;
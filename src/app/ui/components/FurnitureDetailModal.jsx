'use client';
import { useState } from 'react';
import { SessionProvider, useSession } from 'next-auth/react';

import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

import ImageCarousel from './ImageCarousel';
import FurnitureItemForm from './FurnitureItemForm';
import LikeButton from './LikeButton';
import ColorDisplay from './ColorDisplay';

export default function FurnitureDetailModal({
  session,
  open,
  handleClose,
  data,
  handleLikeClick,
  liked,
  updateItemState
}) {

  const [editing, setEditing] = useState(false);

  const handleEditing = () => {
    setEditing(!editing);
  };

  const handleCloseButton = () => {
    setEditing(false);
    handleClose();
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', sm: '80%' },
    height: { xs: '100%', sm: '90%' },
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: { xs: 'auto', sm: 'hidden' }
  };
  
  return (
    <SessionProvider session={session}>
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
        sx={{
          height: '100vh',
          overflow: { xs: 'auto', sm: 'hidden' }
        }}
        >
        <Fade in={open}>
          <Box sx={modalStyle}>
            <IconButton
              onClick={handleCloseButton}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                m: 1,
                zIndex: 10,
                color: { xs: 'white', sm: '#003055' },
                backgroundColor: { xs: 'black', sm: 'white' },
                '&:hover': { backgroundColor: { xs: 'black', sm: 'lightgray' } }
              }}
              >
              <CloseIcon />
            </IconButton>
            <div className='w-full sm:w-[65%] h-full bg-black'>
              <ImageCarousel
                images={data.images}
                autoPlay={false}
                duration={750}
                indicators={false}
                local={false}
                border=''
                imageObjectFit='object-contain'
                imageContainerHeight='h-screen sm:h-[90vh]'
              />
            </div>
            <div className={`${editing ? 'p-0' : 'p-6'} flex items-center justify-center w-full sm:w-[35%] h-fit sm:h-full`}>
              {editing ?
                <FurnitureItemForm
                  editing={true}
                  furnitureItemData={data}
                  handleClose={handleEditing}
                  updateItemState={updateItemState}
                />
                :
                <div className='flex flex-col w-full h-full gap-5'>
                  <div className='flex gap-4 items-center'>
                    <Typography id="transition-modal-title" variant="h6" component="h2">
                      {data.name}
                    </Typography>
                    <EditButton handleEditing={handleEditing} /> 
                  </div>
                  <Typography id="transition-modal-description" sx={{ mt: 0 }}>
                    {data.description}
                  </Typography>
                  <div className='flex flex-wrap gap-2 items-center justify-between'>
                    {data.color &&
                      <ColorDisplay name={data.color.name} code={data.color.code} />
                    }
                    <div className='w-fit h-fit -ml-2'>
                      <LikeButton onClick={handleLikeClick} liked={liked} />
                    </div>
                  </div>
                </div>
              }
            </div>
          </Box>
        </Fade>
      </Modal>
    </SessionProvider>
  );
};

function EditButton({ handleEditing }) {

  const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const { data: session } = useSession();

  if (session && session.user.email === adminEmail) {
    return (
      <IconButton
        onClick={handleEditing}
        color='primary'
      >
        <EditIcon />
      </IconButton>
    );
  }
  
  return null;
};
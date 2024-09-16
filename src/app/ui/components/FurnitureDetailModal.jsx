import {
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
  IconButton } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

import ImageCarousel from './ImageCarousel';

function FurnitureDetailModal({ open, handleClose, data }) {

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', sm: '80%' },
    height: 'fit',
    display: 'flex',
    flexDirection: { xs: 'column', sm: 'row' },
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    overflow: { xs: 'auto', sm: 'hidden'}
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
            onClick={handleClose}
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
          <div className='w-full sm:w-[70%] bg-black'>
            <ImageCarousel
              images={data.images}
              autoPlay={false}
              duration={750}
              indicators={false}
              local={false}
              border=''
              imageObjectFit='object-contain'
              imageContainerHeight='h-[75vh] sm:h-[90vh]'
            />
          </div>
          <div className='p-6 w-full sm:w-[30%] h-[25vh] sm:h-[90vh]'>
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
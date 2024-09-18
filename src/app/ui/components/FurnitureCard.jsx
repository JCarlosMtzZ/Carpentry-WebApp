'use client';
import { useState } from 'react';

import Image from 'next/image';
import {
  Card,
  CardContent,
  Typography,
  CardActionArea
} from '@mui/material';


import LikeButton from './LikeButton';
import FurnitureCardSkeleton from '@/app/ui/components/FurnitureCardSkeleton';
import FurnitureDetailModal from './FurnitureDetailModal';

import { isLocalFurnitureItem, addLocalFurnitureItem, removeLocalFurnitureItem } from '@/app/lib/ajax';

function FurnitureCard({ data, updateItemState }) {

  const bucketUrl = process.env.NEXT_PUBLIC_BUCKET_API_URL;

  const [loading, setLoading] = useState(true);
  const [isWideImage, setIsWideImage] = useState(false);
  const [liked, setLiked] = useState(isLocalFurnitureItem(data.id));
  const [openModal, setOpenModal] = useState(false);

  const handleLikeClick = () => {
    if (liked) {
      removeLocalFurnitureItem(data.id);
      setLiked(false);
      return;
    } 
    addLocalFurnitureItem(data.id);
    setLiked(true);
  };

  const handleImageLoad = ({ naturalWidth, naturalHeight }) => {
    const ratio = naturalWidth / naturalHeight;
    setIsWideImage(ratio >= 1);
    setLoading(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      {loading && <FurnitureCardSkeleton />}
      {openModal &&
        <FurnitureDetailModal
          open={openModal}
          handleClose={handleCloseModal}
          data={data}
          handleLikeClick={handleLikeClick}
          liked={liked}
          updateItemState={updateItemState}
        />
      }
      <Card
        onClick={loading ? undefined : handleOpenModal}
        sx={{
          opacity: loading ? 0 : 1,
          position: loading ? 'absolute' : 'relative',
          width: { xs: '90%', sm: 325 }, height: 265 
        }}
      >
        <CardActionArea
          sx={{
            display: 'flex',
            flexDirection: isWideImage ? 'column' : 'row',
            height: '100%'
          }}
        >
          <div className={`relative ${isWideImage ? 'h-[55%] w-[100%]' : 'h-[100%] w-[60%]' }`}>
            <Image
              quality={25}
              src={bucketUrl + data.images[0].url}
              alt=""
              fill
              className='object-cover '
              onLoadingComplete={handleImageLoad}
              sizes='(max-width: 768px) 75vw, (max-width: 1200px) 30vw, 20vw'
            />
          </div>
          <CardContent
            sx={{
              height: isWideImage ? '45%' : '100%',
              width: isWideImage ? '100%' : '40%',
              color: 'black',
              backgroundColor: 'white'
            }}
          >
            <Typography gutterBottom variant="h5" component="div">
              {data.name}
            </Typography>
            <Typography variant="body2" className={`${isWideImage ? 'line-clamp-2' : 'line-clamp-8'}`}>
              {data.description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <div onClick={e => e.stopPropagation()} className='flex justify-start items-start absolute top-0 left-0 w-[70px] h-[70px]'>
          <LikeButton onClick={handleLikeClick} liked={liked} />
        </div>
      </Card>
    </>
  );
};

export default FurnitureCard;
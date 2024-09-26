'use client';
import { useState, useRef } from 'react';
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
import ColorDisplay from './ColorDisplay';

import {
  isLocalFurnitureItem,
  addLocalFurnitureItem,
  removeLocalFurnitureItem
} from '@/app/lib/ajax';

export default function FurnitureCard({ data, updateItemState }) {

  const bucketUrlRead = process.env.NEXT_PUBLIC_BUCKET_URL_READ;

  const [loading, setLoading] = useState(true);
  const imgRef = useRef(null);
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

  const handleImageLoad = () => {
    if (imgRef.current) {
      const { naturalWidth, naturalHeight } = imgRef.current;
      const ratio = naturalWidth / naturalHeight;
      setIsWideImage(ratio >= 1);
      setLoading(false);
    }
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const imageLoader = ({ src, quality }) => {
    return `${bucketUrlRead}${src}?q=${quality}`
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
          <div className={`relative ${isWideImage ? 'h-[55%] w-[100%]' : 'h-[100%] w-[52.5%]' }`}>
            <Image
              ref={imgRef}
              priority={true}
              quality={25}
              src={data.images[0].url}
              loader={imageLoader}
              alt=""
              fill={true}
              className='object-cover '
              onLoad={handleImageLoad}
              sizes='(max-width: 768px) 75vw, (max-width: 1200px) 30vw, 20vw'
            />
          </div>
          <CardContent
            sx={{
              height: isWideImage ? '45%' : '100%',
              width: isWideImage ? '100%' : '47.5%',
              color: 'black',
              backgroundColor: 'white'
            }}
          >
            <div className='flex items-center gap-1 h-[40px]'>
              <Typography gutterBottom variant="h5" component="div" className='pt-2.5'>
                {data.name}
              </Typography>
              <div className='scale-75'>
                <ColorDisplay code={data.color.code} />
              </div>
            </div>
            <Typography variant="body2" className={`pt-1 ${isWideImage ? 'line-clamp-2' : 'line-clamp-6'}`}>
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
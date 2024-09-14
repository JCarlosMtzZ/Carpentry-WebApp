'use client';
import { useState, useEffect } from 'react';

import Image from 'next/image';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import ThumbIcon from '@mui/icons-material/ThumbUpOffAlt';

import { isLocalFurnitureItem, loadLocalFurnitureItems, addLocalFurnitureItem, removeLocalFurnitureItem } from '@/app/lib/ajax';

function FurnitureCard({ data, imgSrc, onLoad, onClick }) {

  const [isLoading, setIsLoading] = useState(true);
  const [isWideImage, setIsWideImage] = useState(false);
  const [iconColor, setIconColor] = useState(isLocalFurnitureItem(data.id) ? 'info' : 'inherit');

  const handleIconClick = () => {
    if (iconColor === 'inherit') {
      setIconColor('info');
      addLocalFurnitureItem(data.id);
    }
    if (iconColor === 'info') {
      setIconColor('inherit');
      removeLocalFurnitureItem(data.id);
    }
  };

  
  const handleImageLoad = ({ naturalWidth, naturalHeight }) => {
    const ratio = naturalWidth / naturalHeight;
    setIsWideImage(ratio >= 1);
    //onLoad();
  }
  //useEffect(() => {
  //  if (typeof window !== 'undefined') {
  //    const img = new window.Image();
  //    img.src = imgSrc;
  //    img.onload = () => {
  //      const aspecRatio = img.width / img.height;
  //      setIsWideImage(aspecRatio >= 1);
  //      setIsLoading(false);
  //    };
  //    if (onLoad) onLoad();
  //  }
  //}, [imgSrc, onLoad]);

  //if (isLoading)
  //  return null;

  return (
    <Card onClick={onClick} sx={{ position: 'relative', width: { xs: '90%', sm: 325 }, height: 265 }}>
      <CardActionArea
        sx={{
          display: 'flex',
          flexDirection: isWideImage ? 'column' : 'row',
          height: '100%'
        }}
      >
        <div className={`relative ${isWideImage ? 'h-[50%] w-[100%]' : 'h-[100%] w-[40%]' }`}>
          <Image
            quality={1}
            src={imgSrc}
            alt=""
            className='object-cover '
            fill
            onLoadingComplete={handleImageLoad}
            sizes='(max-width: 768px) 75vw, (max-width: 1200px) 30vw, 20vw'
          />
        </div>
        
        {/*<CardMedia
          component="img"
          image={imgSrc}
          alt="furniture"
          sx={{
            height: isWideImage ? '50%' : '100%',
            width: isWideImage ? '100%' : '40%',
            objectFit: 'cover'
          }}
        />*/}
        <CardContent
          sx={{
            height: isWideImage ? '50%' : '100%',
            width: isWideImage ? '100%' : '60%'
          }}
        >
          <Typography gutterBottom variant="h5" component="div">
            {data.name}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {data.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <div onClick={e => e.stopPropagation()} className='flex justify-start items-start absolute top-0 left-0 w-[70px] h-[70px]'>
        <IconButton
          color={iconColor}
          onClick={handleIconClick}
          aria-label="like"
          edge="start"
          size='medium'
          sx={{
            m: 1,
            backgroundColor: 'white',
            opacity: 0.9,
            transition: 'background-color 0.3s ease, opacity 0.3s ease',
            ':hover': {
              backgroundColor: 'lightgray',
              opacity: 1
            }
          }}
        >
          <ThumbIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default FurnitureCard;
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

function FurnitureCard({ imgSrc, onLoad, onClick }) {

  const [isLoading, setIsLoading] = useState(true);
  const [isWideImage, setIsWideImage] = useState(false);
  const [iconColor, setIconColor] = useState('inherit');

  const handleIconClick = () => {
    if (iconColor === 'inherit')
      setIconColor('info');
    if (iconColor === 'info')
      setIconColor('inherit');
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const img = new window.Image();
      img.src = imgSrc;
      img.onload = () => {
        const aspecRatio = img.width / img.height;
        setIsWideImage(aspecRatio >= 1);
        setIsLoading(false);
      };
      if (onLoad) onLoad();
    }
  }, [imgSrc, onLoad]);

  if (isLoading)
    return null;

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
            src={imgSrc}
            alt=""
            className='object-cover '
            fill
            sizes='(max-width: 768px) 90vw, (max-width: 1200px) 33vw, 25vw'
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
            Lizard
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      <div onClick={e => e.stopPropagation()} className='flex justify-end items-end absolute bottom-0 right-0 w-[70px] h-[70px]'>
        <IconButton
          color={iconColor}
          onClick={
            handleIconClick
          }
          aria-label="like"
          edge="start"
          size='large'
          sx={{ m: 1 }}
        >
          <ThumbIcon />
        </IconButton>
      </div>
    </Card>
  );
};

export default FurnitureCard;
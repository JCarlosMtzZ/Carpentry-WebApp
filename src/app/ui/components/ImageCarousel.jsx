'use client';
import Image from "next/image";
import Carousel from "react-material-ui-carousel";

export default function ImageCarousel({
  images,
  autoPlay,
  duration = 1000,
  indicators,
  local,
  border,
  imageObjectFit,
  imageContainerHeight,
}) {

  const bucketUrl = local ? '' : process.env.NEXT_PUBLIC_BUCKET_API_URL;

  return (
    <Carousel
      animation='slide'
      indicators={indicators}
      duration={duration}
      navButtonsProps={{
        style: {
          backgroundColor: 'black',
          color: 'white',
        }
      }}
      className={`rounded-[5px] ${border} border-white bg-black flex flex-col items-center justify-center w-full h-fit`}
      autoPlay={autoPlay}
    >
      {images.length > 0 && images.map((image) => (
        <div key={image.id} className={`relative w-full ${imageContainerHeight}`}>
          <Image
            quality={75}
            src={bucketUrl + image.url}
            className={imageObjectFit}
            fill
            alt=''
            sizes='(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 50vw'
          />
        </div>
      ))}
    </Carousel>
  );
};


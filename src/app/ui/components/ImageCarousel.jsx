'use client';
import Image from "next/image";
import Carousel from "react-material-ui-carousel";

export default function ImageCarousel({
  images,
  height,
  autoPlay,
  indicators,
  local
}) {

  const bucketUrl = local ? '' : process.env.NEXT_PUBLIC_BUCKET_API_URL;

  return (
    <Carousel
      animation='slide'
      indicators={indicators}
      duration={1000}
      navButtonsProps={{
        style: {
          backgroundColor: 'black',
          color: 'white',
        }
      }}
      className="rounded-[5px] border-2 border-white bg-black flex flex-col items-center justify-center w-full h-fit"
      
      autoPlay={autoPlay}
    >
      {images.length > 0 && images.map((image) => (
        <div key={image.id} className="relative w-full h-[500px] sm:h-[375px]">
          <Image
            quality={75}
            src={bucketUrl + image.url}
            className='object-cover'
            fill
            alt=''
            sizes='(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 50vw'
          />
          <div className="bg-black/60 bottom-0 absolute w-full h-[65px]">
            12345
          </div>
        </div>
      ))}
    </Carousel>
  );
};


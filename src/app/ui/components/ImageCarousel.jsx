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

  const bucketUrl = local ? '' : process.env.NEXT_PUBLIC_BUCKET_URL_READ;

  const imageLoader = ({ src, quality }) => {
    return local ? `${src}?q=${quality}` : `${bucketUrl}${src}?q=${quality}`
  };

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
      className={`rounded-[3px] ${border} border-white bg-black flex flex-col items-center justify-center w-full h-fit`}
      autoPlay={autoPlay}
    >
      {images.length > 0 && images.map((image) => (
        <div key={image.id} className={`relative w-full ${imageContainerHeight}`}>
          <Image
            priority={true}
            quality={80}
            src={image.url}
            loader={imageLoader}
            className={imageObjectFit}
            fill={true}
            alt=''
            sizes='(max-width: 768px) 90vw, (max-width: 1200px) 40vw, 50vw'
          />
        </div>
      ))}
    </Carousel>
  );
};


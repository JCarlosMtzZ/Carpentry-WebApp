'use client';
import Image from "next/image";
import Carousel from "react-material-ui-carousel";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  navButtons: {
    opacity: 1,
    backgroundColor: 'black',
    color: 'white',
  },
  navButtonsWrapper: {
    
  },
  indicatorContainer: {
    padding: '5px',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'black',
    zIndex: 10
  }
});

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

  const classes = useStyles();

  const bucketUrl = local ? '' : process.env.NEXT_PUBLIC_BUCKET_URL_READ;

  const imageLoader = ({ src, quality }) => {
    return local ? `${src}?q=${quality}` : `${bucketUrl}${src}?q=${quality}`
  };

  return (
    <div className="relative w-full h-full">
      <div className="h-[calc(100%-30px)] w-[70%] top-0 left-[15%] absolute z-20"></div>
      <Carousel
        animation='slide'
        indicators={indicators}
        duration={duration}
        navButtonsProps={{
          className: classes.navButtons
        }}
        navButtonsWrapperProps={{
          className: classes.navButtonsWrapper
        }}
        indicatorContainerProps={{
          className: classes.indicatorContainer
        }}
        className={`relative rounded-[3px] ${border} border-white bg-black flex flex-col items-center justify-center w-full h-fit`}
        autoPlay={autoPlay}
        cycleNavigation={false}
        swipe={false}
        navButtonsAlwaysVisible={true}
        >
        {images.length > 0 && images.map((image) => (
          <div key={image.id} className={`relative w-full ${imageContainerHeight}`}>
            <Image
              priority={true}
              quality={70}
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
    </div>
  );
};


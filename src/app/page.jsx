import ImageCarousel from "@/app/ui/components/ImageCarousel";
import { Button, Typography } from "@mui/material";

import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';

export default function Home() {

  const carouselImages = [
    {id: 1, url: '/carousel_img_1.jpg'},
    {id: 2, url: '/carousel_img_2.jpg'},
    {id: 3, url: '/carousel_img_3.jpg'},
    {id: 4, url: '/carousel_img_4.jpg'},
  ];

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:h-full">
      <div className="p-6 md:p-16 w-full md:w-[55%] h-[calc(100vh-65px)] md:h-full flex flex-col justify-evenly md:justify-center">
        <div className="w-full h-[75%] text-center md:text-left flex flex-col justify-evenly md:justify-center md:gap-8 items-center md:items-start">
          <Typography variant="h4">
            Muebles a la medida
          </Typography>
          <Typography variant="subtitle1">
            Desde cortineros hasta cocinas integrales con la calidad y durabilidad de más de 30 años de experiencia. Solicita tu cotización sin compromiso
          </Typography>
          <Button
            size="large"
            variant="contained"
            sx={{ width: '150px' }}
            >
            Explorar
          </Button>
        </div>
        <div className=" h-[25%] flex flex-col gap-4 md:justify-end justify-start">
          <div className="flex items-center gap-3">
            <PlaceIcon color="primary" />
            <Typography variant="body1">
              Reforma 10, San José de la Candelaria, Pinos, Zac.
            </Typography>
          </div>
          <div className="flex items-center gap-3">
            <CallIcon color="primary" />
            <Typography variant="body1">
              444 111 0000
            </Typography>
          </div>
        </div>
      </div>
      <div className="relative md:px-16 w-full md:w-[45%] h-[calc(100vh-65px)] md:h-full flex items-center justify-center">
        <div className={`hidden md:block absolute right-0 rounded-edge-left`}></div>
        <div className={`block md:hidden absolute right-0 bottom-0 rounded-edge-top`}></div>
        <ImageCarousel
          images={carouselImages}
          autoPlay={true}
          indicators={true}
          local={true}
          border='border-2'
          imageObjectFit='object-cover'
          imageContainerHeight='h-[500px] sm:h-[375px]'
        />
      </div>
    </div>
  );
}

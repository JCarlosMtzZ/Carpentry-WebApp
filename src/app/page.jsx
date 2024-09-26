import { Typography } from "@mui/material";
import Image from "next/image";

import PlaceIcon from '@mui/icons-material/Place';
import CallIcon from '@mui/icons-material/Call';
import ExploreButton from "./ui/components/ExploreButton";

import { fetchCategories } from "./lib/serverAjax";

export default async  function Home() {

  const categories = await fetchCategories();

  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:h-full">
      <div className="p-4 pb-14 md:pb-4 w-full md:w-[45%] h-[calc(100vh-65px)] md:h-full flex flex-col justify-center items-center gap-6 md:gap-2">
        <Image
          priority={true}
          quality={100}
          src='/logo_light_blue_2x.png'
          width={430}
          height={430}
          alt="logo"
          className="-mt-8"
        />
        <div className="flex items-center justify-center gap-3 -mt-4">
          <PlaceIcon color="primary" />
          <Typography variant="subtitle1">
            Reforma 10, Pinos, Zac.
          </Typography>
        </div>
        <div className="flex items-center gap-3">
          <CallIcon color="primary" />
          <Typography variant="subtitle1">
            492 909 1369
          </Typography>
        </div>
      </div>
      <div className="relative w-full md:w-[55%] h-[calc(100vh-65px)] md:h-full flex items-center justify-center">
        <div className={`z-10 hidden md:block absolute right-0 rounded-edge-left`}></div>
        <div className={`z-10 block md:hidden absolute right-0 bottom-0 rounded-edge-top`}></div>
        <div className="px-14 md:px-20 text-white z-20 w-full h-full text-center md:text-left flex flex-col justify-center gap-16 items-center md:items-start">
          <Typography variant="h4">
            Muebles a la medida
          </Typography>
          <Typography variant="subtitle1">
            Desde cortineros hasta cocinas integrales con la calidad y durabilidad de más de 30 años de experiencia al mejor precio
            <br /><br />
            Solicita tu cotización sin compromiso
          </Typography>
          <ExploreButton
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};

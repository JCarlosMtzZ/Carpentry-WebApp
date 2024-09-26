import { Typography } from "@mui/material";

import { LuPaintbrush } from "react-icons/lu";

import { isDarkColor } from "@/app/lib/utils";

export default function ColorDisplay({ name, code }) {
  return (
    <div className='flex items-center gap-4'>
      <div style={{ backgroundColor: code }} className={`${!isDarkColor(code) && 'border-2 border-black'} w-fit h-fit p-2 rounded-[50%]`}>
        <LuPaintbrush size={`${isDarkColor(code) ? '1.5rem' : '1.3rem'}`} color={isDarkColor(code) ? '#ffffff' : '#000000'} />
      </div>
      {name &&
        <Typography>
          {name}
        </Typography>
      }
    </div>
  );
};
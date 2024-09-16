import { Skeleton } from "@mui/material";

export default function FurnitureCardSkeleton() {
  return (
    <div className='flex flex-col bg-white w-[90%] sm:w-[330px] h-[265px] rounded-[5px] shadow-md'>
      <Skeleton animation='wave' variant='rectangular' width='100%' height='50%' />
      <div className="flex flex-col p-4">
        <Skeleton animation='wave' width='40%' height='50px' />
        <Skeleton animation='wave' width='100%' height='30px' />
        <Skeleton animation='wave' width='70%' height='30px' />
      </div>
    </div>
  );
};
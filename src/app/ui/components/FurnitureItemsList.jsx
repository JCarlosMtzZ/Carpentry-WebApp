import { Typography } from "@mui/material";

import FurnitureCard from "./FurnitureCard";

export default function FurnitureItemsList({ header, furnitureItems }) {
  return (
    <div className='flex flex-col w-full'>
      <div className='mb-4 py-2 px-4 w-full h-fit flex justify-between'>
        <Typography variant="h4">
          {header}
        </Typography>
      </div>
      <div className='flex flex-wrap justify-center gap-6 w-full'>
        {furnitureItems.length > 0 && furnitureItems.map(item => (
          <FurnitureCard
            key={item.id}
            data={item}
            onClick={() => handleOpenModal(item)}
          />
        ))}
      </div>
    </div>
  );
};
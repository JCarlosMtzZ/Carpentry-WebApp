import { Typography, Pagination } from "@mui/material";

import FurnitureCard from "./FurnitureCard";

export default function FurnitureItemsList({
  page,
  totalPages,
  handlePageChange,
  header,
  furnitureItems,
  updateItemState
}) {
  return (
    <div className='flex flex-col w-full'>
      <div className='border-b border-black/40 mb-4 pb-2 px-4 w-full h-fit flex flex-col sm:flex-row justify-between gap-2'>
        <Typography variant="h4">
          {header}
        </Typography>
        {furnitureItems.length > 0 &&
          <Pagination
            onChange={handlePageChange}
            count={totalPages}
            color="primary"
            size="large"
            page={page}
            className="hidden sm:block"
          />
        }
      </div>
      <div className='mt-2 flex flex-wrap justify-center gap-8 w-full'>
        {furnitureItems.length > 0 && furnitureItems.map(item => (
          <FurnitureCard
            key={item.id}
            data={item}
            onClick={() => handleOpenModal(item)}
            updateItemState={updateItemState}
          />
        ))}
        {furnitureItems.length > 0 &&
          <Pagination
            onChange={handlePageChange}
            count={totalPages}
            color="primary"
            size="large"
            page={page}
            className="block sm:hidden"
          />
        }
      </div>
    </div>
  );
};
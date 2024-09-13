'use client';
import { useState, useEffect } from "react";

import { Typography } from "@mui/material";

import FurnitureCard from "@/app/ui/components/FurnitureCard";

import Loading from "./loading";
import FurnitureDetailModal from "@/app/ui/components/FurnitureDetailModal";

import { getFurnitureItemComplete } from "@/app/lib/ajax";

function Page({ params }) {

  const [furnitureItems, setFurnitureItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const furnitureItemsResult = await getFurnitureItemComplete(params.id);
        if (furnitureItemsResult.length === 0)
          throw new Error('FurnitureItems not found');
        setFurnitureItems(furnitureItemsResult);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const [isLoading, setIsLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState([]);

  const handleOpenModal = (data) => {
    setModalData(data);
    setOpenModal(true);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className="bg-[#003055]/5 p-4 flex flex-wrap justify-center gap-6 w-full h-full">
      {isLoading && <Loading />}
      <FurnitureDetailModal
        open={openModal}
        handleClose={handleCloseModal}
        data={modalData}
      />
      {furnitureItems.length > 0 ? furnitureItems.map(item => (
        <FurnitureCard
          key={item.id}
          imgSrc={process.env.NEXT_PUBLIC_BUCKET_API_URL + item.images[0].url}
          onLoad={() => setIsLoading(false)}
          onClick={() => handleOpenModal(item)}
        />
      )) : (
        <Typography id="transition-modal-title" variant="h6" component="h2">
          Error del servidor o elementos no encontrados
        </Typography>
      )}
    </div>
  );
};

export default Page;
'use client';
import { useState, useEffect } from "react";

import { Typography } from "@mui/material";

import FurnitureCard from "../ui/components/FurnitureCard";
import FurnitureDetailModal from "../ui/components/FurnitureDetailModal";

import { loadLocalFurnitureItems, getFurnitureItemCompleteById } from "../lib/ajax";

function Page() {
  
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const localFavorites = loadLocalFurnitureItems();
        if (localFavorites.length === 0)
          return;
        const getFurnitureItemsPromises = localFavorites.map(id => {
          return getFurnitureItemCompleteById(id);
        });
        const furnitureItemsResult = await Promise.all(getFurnitureItemsPromises);
        setFavorites(furnitureItemsResult);
      } catch (error) {
        console.error(error);
      }
    }
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
      <FurnitureDetailModal
        open={openModal}
        handleClose={handleCloseModal}
        data={modalData}
      />
      {favorites.length > 0 ? favorites.map(item => (
        <FurnitureCard
          key={item.id}
          data={item}
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
'use client';
import { useState, useEffect } from "react";

import FurnitureCard from "@/app/ui/components/FurnitureCard";

const nums = ['/img.jpg', '/img2.jpg', '/img3.jpg'];

import Loading from "./loading";
import FurnitureDetailModal from "@/app/ui/components/FurnitureDetailModal";

function Page({ params }) {

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
      <p>Categoría:{' ' + params.id}</p>
      {isLoading && <Loading />}
      <FurnitureDetailModal
        open={openModal}
        handleClose={handleCloseModal}
        data={modalData}
      />
      {nums.map(num => (
        <FurnitureCard
          key={num}
          imgSrc={num}
          onLoad={() => setIsLoading(false)}
          onClick={() => handleOpenModal(nums)}
        />
      ))}
    </div>
  );
};

export default Page;
'use client';
import { useState, useEffect } from "react";

import { loadLocalFurnitureItems, getFurnitureItemCompleteById } from "../lib/ajax";

import FurnitureCardSkeleton from "@/app/ui/components/FurnitureCardSkeleton";
import FurnitureItemsList from "@/app/ui/components/FurnitureItemsList";

function Page() {
  
  const [loading, setLoading] = useState(true);
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
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  return (
    <div className="p-4 flex flex-wrap justify-center gap-6 w-full min-h-full">
      {loading ? 
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <FurnitureCardSkeleton key={index} />
          ))}
        </>
        :
        <FurnitureItemsList header='Favoritos' furnitureItems={favorites} />
      }
    </div>
  );
};

export default Page;
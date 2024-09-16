'use client';
import { useState, useEffect } from "react";

import { Typography } from "@mui/material";

import { loadLocalFurnitureItems, getFurnitureItemCompleteById } from "../lib/ajax";

import FurnitureCardSkeleton from "@/app/ui/components/FurnitureCardSkeleton";
import FurnitureItemsList from "@/app/ui/components/FurnitureItemsList";

function Page() {
  
  const [localFavorites, setLocalFavorites] = useState([]);
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchData = async (page = 1, pageSize = 5) => {
    setLoading(true);
    try {
      const localLength = localFavorites.length;
      const startIndex = (page - 1) * pageSize;
      const endIndex = (page * pageSize);

      const favoritesToFetch = localFavorites.slice(
        startIndex,
        localLength < endIndex ? localLength : endIndex
      );

      const getFurnitureItemsPromises = favoritesToFetch.map(id => {
        return getFurnitureItemCompleteById(id);
      });
      const furnitureItemsResult = await Promise.all(getFurnitureItemsPromises);
      setFavorites(furnitureItemsResult);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setLocalFavorites(loadLocalFurnitureItems());
  }, [page]);

  useEffect(() => {
    if (localFavorites.length === 0) {
      setLoading(false);
      return;
    }
    if (Math.ceil(localFavorites.length / 5) < page) {
      setPage(Math.ceil(localFavorites.length / 5));
      return;
    }
    fetchData(page);
  }, [localFavorites]);

  const handlePageChange = async (event, value) => {
    setPage(value);
  };
  
  return (
    <div className="p-4 flex flex-col w-full min-h-full">
      <FurnitureItemsList
        page={page}
        totalPages={Math.ceil(localFavorites.length / 5)}
        handlePageChange={handlePageChange}
        header='Favoritos'
        furnitureItems={favorites}
      />
      {
        loading ?
        <div className="flex flex-wrap gap-6 justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <FurnitureCardSkeleton key={index} />
          ))}
        </div>
        :
        localFavorites.length === 0 &&
          <Typography variant="subtitle1" className="text-center">
            No has agregado muebles a favoritos
          </Typography>
      }
    </div>
  );
};

export default Page;
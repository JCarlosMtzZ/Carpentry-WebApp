'use client';
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { Typography } from "@mui/material";

import { loadLocalFurnitureItems, getFurnitureItemCompleteById } from "../lib/ajax";

import FurnitureCardSkeleton from "@/app/ui/components/FurnitureCardSkeleton";
import FurnitureItemsList from "@/app/ui/components/FurnitureItemsList";

export default function Page() {
  
  const defaultPageSize = 6;
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');
  
  const [localFavorites, setLocalFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);

  const fetchData = async (page = 1, pageSize = defaultPageSize) => {
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
    window.scrollTo(0, 0);
    setLocalFavorites(loadLocalFurnitureItems());
  }, [pageParam]);

  useEffect(() => {
    if (localFavorites.length === 0) {
      setLoading(false);
      return;
    }
    if (Math.ceil(localFavorites.length / defaultPageSize) < pageParam) {
      router.push(`/favorites?page=${Math.ceil(localFavorites.length / defaultPageSize)}`);
      return;
    }
    fetchData(pageParam);
  }, [localFavorites]);

  const handlePageChange = async (event, value) => {
    if (pageParam !== value)
      router.push(`/favorites?page=${value}`);
  };
  
  return (
    <div className="p-4 flex flex-col w-full min-h-full">
      <FurnitureItemsList
        page={parseInt(pageParam)}
        totalPages={Math.ceil(localFavorites.length / defaultPageSize)}
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
            No se encontraron muebles en favoritos
          </Typography>
      }
    </div>
  );
};
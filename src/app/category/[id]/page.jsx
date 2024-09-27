'use client';
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCategoriesColors } from "@/app/lib/context/CategoriesColorsContext";

import { Skeleton, Typography } from "@mui/material";

import FurnitureCardSkeleton from "../../ui/components/FurnitureCardSkeleton";
import FurnitureItemsList from "@/app/ui/components/FurnitureItemsList";

import { getFurnitureItemsComplete } from "@/app/lib/ajax";

export default function Page({ params }) {

  const { categories } = useCategoriesColors();

  const router = useRouter();
  const searchParams = useSearchParams();
  const pageParam = searchParams.get('page');

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState(null);
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [pageSize, setPageSize] = useState(6);
  const [totalRows, setTotalRows] = useState(1);

  const fetchData = async (categoryId, page) => {
    setLoading(true);
    try {
      const furnitureItemsResult = await getFurnitureItemsComplete(categoryId, page);

      if (furnitureItemsResult.totalRows === 0)
        throw new Error('FurnitureItems not found');

      const maxPages = Math.ceil(furnitureItemsResult.totalRows / furnitureItemsResult.pageSize);
      if (maxPages < page) {
        router.push(`/category/${params.id}?page=${maxPages}`);
      } else if (page <= 0) {
        router.push(`/category/${params.id}?page=1`);
      } else {
        setFurnitureItems(furnitureItemsResult.rows);
        setPageSize(furnitureItemsResult.pageSize);
        setTotalRows(furnitureItemsResult.totalRows);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!category) {
      const foundCategory = categories.find(cat => cat.id === params.id)
      setCategory(foundCategory);
    }
    fetchData(params.id, pageParam);
  }, [pageParam]);

  const handlePageChange = (event, value) => {
    if (pageParam !== value)
      router.push(`/category/${params.id}?page=${value}`);
  };
  
  const updateFurnitureItemData = (id, data) => {
    setFurnitureItems(furnitureItems.map(item =>
      item.id === id ?{ ...item, ...data } : item
    ));
  };

  return (
    <div className="p-4 w-full min-h-full">
      {loading ? 
        <div className="flex flex-col w-full ">
          <div className='flex items-center px-4'>
            <Skeleton animation='wave' height='60px' width='15%' />
            <Skeleton animation='wave' variant="circular" height='40px' width='40px' className="ml-auto" />
            <Skeleton animation='wave' variant="circular" height='40px' width='40px' className="ml-2" />
            <Skeleton animation='wave' variant="circular" height='40px' width='40px' className="ml-2" />
          </div>
          <div className="flex flex-wrap justify-center gap-6 w-full mt-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <FurnitureCardSkeleton key={index} />
            ))}
          </div>
        </div>
        :
        <div className="w-full flex flex-col">
          <FurnitureItemsList
            page={parseInt(pageParam)}
            totalPages={Math.ceil(totalRows / pageSize)}
            handlePageChange={handlePageChange}
            header={category.name}
            furnitureItems={furnitureItems}
            updateItemState={updateFurnitureItemData}
          />
          {furnitureItems.length === 0 &&
            <Typography variant="subtitle1" className="text-center">
              {`No se encontraron muebles en esta categoría`}
            </Typography> 
          }
        </div>
      }
    </div>
  );
};
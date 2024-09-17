'use client';
import { useState, useEffect } from "react";

import { Skeleton } from "@mui/material";

import FurnitureCardSkeleton from "../../ui/components/FurnitureCardSkeleton";
import FurnitureItemsList from "@/app/ui/components/FurnitureItemsList";

import { getCategoryById, getFurnitureItemsComplete } from "@/app/lib/ajax";

function Page({ params }) {

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [furnitureItems, setFurnitureItems] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(0);
  const [totalRows, setTotalRows] = useState(0);

  const fetchData = async (fetchCategory, categoryId, page) => {
    setLoading(true);
    try {
      if (fetchCategory) {
        const categoryResult = await getCategoryById(categoryId);
        setCategory(categoryResult);
      }
      const furnitureItemsResult = await getFurnitureItemsComplete(categoryId, page);
      if (furnitureItemsResult.rows.length === 0)
        throw new Error('FurnitureItems not found');
      setFurnitureItems(furnitureItemsResult.rows);
      setPage(furnitureItemsResult.page);
      setPageSize(furnitureItemsResult.pageSize);
      setTotalRows(furnitureItemsResult.totalRows);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(true, params.id, 1);
  }, []);

  const handlePageChange = async (event, value) => {
    if (page !== value)
      await fetchData(false, params.id, value);
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
        <FurnitureItemsList
          page={page}
          totalPages={Math.ceil(totalRows / pageSize)}
          handlePageChange={handlePageChange}
          header={category.name}
          furnitureItems={furnitureItems}
          updateItemState={updateFurnitureItemData}
        />
      }
    </div>
  );
};

export default Page;
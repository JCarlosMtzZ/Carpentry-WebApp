'use client';
import { useState, useEffect } from "react";

import FurnitureCardSkeleton from "../../ui/components/FurnitureCardSkeleton";

import { getCategoryById, getFurnitureItemsComplete } from "@/app/lib/ajax";
import FurnitureItemsList from "@/app/ui/components/FurnitureItemsList";

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
    await fetchData(false, params.id, value);
  };
  
  return (
    <div className="p-4 flex flex-wrap justify-center gap-6 w-full min-h-full">
      {loading ? 
        <>
          {Array.from({ length: 6 }).map((_, index) => (
            <FurnitureCardSkeleton key={index} />
          ))}
        </>
        :
        <FurnitureItemsList
          page={page}
          totalPages={Math.ceil(totalRows / pageSize)}
          handlePageChange={handlePageChange}
          header={category.name}
          furnitureItems={furnitureItems}
        />
      }
    </div>
  );
};

export default Page;
'use client';
import { useState, useEffect } from "react";

import FurnitureCardSkeleton from "../../ui/components/FurnitureCardSkeleton";

import { getCategoryById, getFurnitureItemsComplete } from "@/app/lib/ajax";
import FurnitureItemsList from "@/app/ui/components/FurnitureItemsList";

function Page({ params }) {

  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState({});
  const [furnitureItems, setFurnitureItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryResult = await getCategoryById(params.id);
        const furnitureItemsResult = await getFurnitureItemsComplete(params.id);
        if (furnitureItemsResult.length === 0)
          throw new Error('FurnitureItems not found');
        setCategory(categoryResult);
        setFurnitureItems(furnitureItemsResult);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
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
        <FurnitureItemsList header={category.name} furnitureItems={furnitureItems} />
      }
    </div>
  );
};

export default Page;
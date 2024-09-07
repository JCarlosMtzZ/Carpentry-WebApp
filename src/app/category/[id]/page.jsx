import FurnitureCard from "@/app/ui/components/FurnitureCard";

const nums = ['/img.jpg', '/img2.jpg', '/img3.jpg'];

function Page({ params }) {
  return (
    <div className="bg-[#003055]/5 p-4 flex flex-wrap justify-center gap-6">
      {nums.map(num => (
        <FurnitureCard key={num} imgSrc={num} />
      ))}
    </div>
  );
};

export default Page;
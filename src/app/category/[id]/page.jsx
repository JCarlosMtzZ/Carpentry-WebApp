function Page({ params }) {
  return (
    <div>
      <div className="w-[200px] h-[400px] bg-slate-300">
        This is the id:{' ' + params.id}
      </div>
    </div>
  );
};

export default Page;
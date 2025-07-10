const BookCardLoader = () => {
  return (
    <div className="bg-primary/40 shadow-md rounded-2xl overflow-hidden animate-pulse flex flex-col justify-between p-4 min-h-[320px]">
      <div className="flex flex-col items-center text-center">
        <div className="h-48 w-40 bg-secondary rounded-md mb-3" />
        <div className="h-6 w-32 bg-secondary rounded mt-2" />
      </div>
      <div className="h-4 w-24 bg-secondary rounded mt-6 mx-auto" />
    </div>
  );
};

export default BookCardLoader;

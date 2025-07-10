const BookDetailLoader = () => {
  return (
    <div className="animate-pulse px-4 md:px-10 py-8">
      <div className="h-8 w-64 bg-primary/40 rounded mb-6" />

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex flex-col items-center lg:items-start">
          <div className="w-60 h-80 bg-primary/30 rounded-md shadow-md mb-4" />
        </div>

        <div className="flex-1 space-y-4">
          <div className="space-y-2">
            <div className="h-6 w-40 bg-primary/30 rounded" />
            <div className="h-4 w-full bg-primary/20 rounded" />
            <div className="h-4 w-11/12 bg-primary/20 rounded" />
            <div className="h-4 w-10/12 bg-primary/20 rounded" />
          </div>

          <div className="space-y-2 pt-6">
            <div className="h-4 w-1/2 bg-primary/20 rounded" />
            <div className="h-4 w-1/3 bg-primary/20 rounded" />
            <div className="h-4 w-2/5 bg-primary/20 rounded" />
            <div className="h-4 w-1/4 bg-primary/20 rounded" />
            <div className="h-4 w-1/3 bg-primary/20 rounded" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div className="h-6 w-36 bg-primary/30 rounded" />
          <div className="h-10 w-40 bg-primary/20 rounded" />
          <div className="h-10 w-40 bg-primary/20 rounded" />
        </div>
      </div>
    </div>
  );
};

export default BookDetailLoader;

import { Card } from "@/components/ui/card";

const BookDetailsLoader = () => {
  return (
    <Card className="m-auto px-6 py-8 shadow-xl w-full md:w-[80%] lg:w-[60%] overflow-y-auto overflow-x-hidden flex flex-col justify-start animate-pulse space-y-6">
      <div className="h-8 w-3/4 bg-primary/40 rounded mb-4 mx-auto" />

      <div className="flex flex-col md:flex-row justify-between gap-5">
        <div className="w-[20rem] h-[30rem] bg-primary/30 rounded-lg shadow-md" />
        <div className="flex flex-col justify-end space-y-4 w-full">
          <div className="h-4 w-1/2 bg-primary/20 rounded" />
          <div className="h-4 w-1/3 bg-primary/20 rounded" />
          <div className="h-4 w-1/4 bg-primary/20 rounded" />
        </div>
      </div>

      <div className="space-y-3">
        <div className="h-6 w-36 bg-primary/30 rounded" />
        <div className="space-y-2">
          <div className="h-4 w-full bg-primary/20 rounded" />
          <div className="h-4 w-11/12 bg-primary/20 rounded" />
          <div className="h-4 w-10/12 bg-primary/20 rounded" />
          <div className="h-4 w-9/12 bg-primary/20 rounded" />
          <div className="h-4 w-3/4 bg-primary/20 rounded" />
        </div>
      </div>

      <div className="flex items-center justify-around mt-4">
        <div className="h-5 w-32 bg-primary/20 rounded" />
        <div className="h-10 w-24 bg-primary/30 rounded" />
      </div>
    </Card>
  );
};

export default BookDetailsLoader;

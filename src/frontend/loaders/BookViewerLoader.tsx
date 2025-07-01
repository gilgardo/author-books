const BookViewerLoader = () => {
  return (
    <div className="h-250 sm:w-[70%] w-full bg-white animate-pulse">
      <img
        className="h-full w-[70%] object-cover m-auto"
        src={"/default_book_cover.jpg"}
        alt={"default-book-cover"}
      />
    </div>
  );
};

export default BookViewerLoader;

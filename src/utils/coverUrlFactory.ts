const coverUrlFactory = (cover_i: number | undefined) => {
  if (cover_i === undefined)
    return {
      S: "/default_book_cover.jpg",
      L: "/default_book_cover.jpg",
      M: "/default_book_cover.jpg",
    };
  return {
    S: `https://covers.openlibrary.org/b/id/${cover_i}-S.jpg`,
    L: `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`,
    M: `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`,
  };
};

export default coverUrlFactory;

const coverUrlFactory = (
  cover_i: number | undefined,
  ocaid: string | undefined
) => {
  if (!cover_i && !ocaid)
    return {
      S: "/default_book_cover.jpg",
      L: "/default_book_cover.jpg",
      M: "/default_book_cover.jpg",
    };
  if (cover_i)
    return {
      S: `https://covers.openlibrary.org/b/id/${cover_i}-S.jpg`,
      L: `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`,
      M: `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`,
    };
  return {
    S: `https://archive.org/services/img/${ocaid}`,
    L: `https://archive.org/services/img/${ocaid}`,
    M: `https://archive.org/services/img/${ocaid}`,
  };
};

export default coverUrlFactory;

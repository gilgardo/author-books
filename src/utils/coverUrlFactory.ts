const coverUrlFactory = (cover_i: number) => {
  return {
    S: `https://covers.openlibrary.org/b/id/${cover_i}-S.jpg`,
    L: `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`,
    M: `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`,
  };
};

export default coverUrlFactory;

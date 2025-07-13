const bookKeys = {
  all: ["book"] as const,
  docs: (q: string, page: number) =>
    [...bookKeys.all, "docs", { q, page }] as const,
  doc: (q: string, page: number, key: string) =>
    [...bookKeys.docs(q, page), { key }] as const,
  ediction: (key: string) => [...bookKeys.all, "ediction", { key }] as const,
  work: (key: string) => [...bookKeys.all, "work", { key }] as const,
};

export default bookKeys;

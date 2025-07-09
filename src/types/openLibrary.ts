export interface OpenLibrarySearchDoc {
  author_key: string[];
  author_name: string[];
  cover_edition_key?: string;
  cover_i?: number;
  ebook_access?: "borrowable" | "public";
  edition_count: number;
  first_publish_year?: number;
  has_fulltext: boolean;
  ia?: string[];
  ia_collection_s?: string;
  key: string; // starts with "/works/"
  language?: string[];
  lending_edition_s?: string;
  lending_identifier_s?: string;
  public_scan_b: boolean;
  title: string;
}
export interface OpenLibrarySearchResponse {
  numFound: number;
  start: number;
  numFoundExact: boolean;
  num_found: number;
  offset: number | null;
  documentation_url: string;
  q: string;
  docs: OpenLibrarySearchDoc[];
}

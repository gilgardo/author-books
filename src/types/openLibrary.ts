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
  key: string;
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

export type OpenLibraryWork = {
  title: string;
  covers?: number[];
  subject_places?: string[];
  subjects?: string[];
  subject_people?: string[];
  key: string;
  authors?: {
    author: {
      key: string;
    };
    type: {
      key: string;
    };
  }[];
  subject_times?: string[];
  type: {
    key: string;
  };
  description?:
    | {
        type: string;
        value: string;
      }
    | string;
  latest_revision?: number;
  revision?: number;
  created?: {
    type: string;
    value: string;
  };
  last_modified?: {
    type: string;
    value: string;
  };
};

export type OpenLibraryEdition = {
  works: {
    key: string;
  }[];
  title: string;
  publishers: string[];
  publish_date: string;
  key: string;
  type: {
    key: string;
  };
  identifiers: Record<string, string[]>;
  ocaid?: string;
  classifications: Record<string, unknown>;
  subtitle?: string;
  publish_places: string[];
  edition_name?: string;
  languages: {
    key: string;
  }[];
  physical_format?: string;
  number_of_pages?: number;
  pagination?: string;
  covers?: number[];
  source_records?: string[];
  latest_revision: number;
  revision: number;
  created: {
    type: string;
    value: string;
  };
  last_modified: {
    type: string;
    value: string;
  };
};

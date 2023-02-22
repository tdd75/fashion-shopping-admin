export interface Query {
  page?: number;
  itemsPerPage?: number;
  sortBy?: {
    key: string;
    order: string;
  }[];
  search?: string;
}

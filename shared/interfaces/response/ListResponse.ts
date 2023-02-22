export interface ListResponse<T> {
  next: string;
  previous: string;
  count: number;
  results: T[];
}

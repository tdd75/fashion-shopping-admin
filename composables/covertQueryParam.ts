import { Query } from '@/shared/interfaces/request/Query';

export const convertQueryParam = (query: Query) => {
  let ordering = undefined;
  if (query.sortBy?.length && query.sortBy.length > 0) {
    ordering = query.sortBy[0].order === 'asc' ? '' : '-' + query.sortBy[0].key;
  }
  return {
    limit: query.itemsPerPage || undefined,
    offset:
      query.page && query.itemsPerPage
        ? (query.page - 1) * query.itemsPerPage
        : undefined,
    ordering,
    search: query.search || undefined,
  };
};

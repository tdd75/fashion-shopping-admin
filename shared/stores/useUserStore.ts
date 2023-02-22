import { LIMIT_PRODUCT_TABLE } from '@/shared/constants';
import { Query } from '@/shared/interfaces/request/Query';
import { CustomUser } from '@/shared/interfaces/response/CustomUser';
import { ListResponse } from '@/shared/interfaces/response/ListResponse';

interface UserState {
  isLoading: boolean;
  users: CustomUser[];
  me: CustomUser | null;
  totalItems: number;
  query: Query;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isLoading: false,
    users: [],
    me: null,
    totalItems: 0,
    query: {
      page: 1,
      itemsPerPage: LIMIT_PRODUCT_TABLE,
      sortBy: [],
      search: '',
    },
  }),
  actions: {
    async fetchUsers() {
      this.isLoading = true;
      const { data, error } = await useFetch<ListResponse<CustomUser>>(
        '/users/admin/',
        {
          ...useFetchOptions(),
          params: {
            ...convertQueryParam(this.query),
          },
        },
      );
      if (!error.value && data.value) {
        const { results, count } = data.value;
        this.users = results;
        this.totalItems = count;
      }
      this.isLoading = false;
    },
    async getInfo() {
      const { data, error } = await useFetch<CustomUser>('/users/me/', {
        ...useFetchOptions(),
      });
      if (!error.value) {
        this.me = data.value;
      }
    },
  },
});

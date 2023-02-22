import { LIMIT_PRODUCT_TABLE } from '@/shared/constants';
import { NotifyType } from '@/shared/enums';
import { ProductCreate } from '@/shared/interfaces/request/ProductCreate';
import { ProductUpdate } from '@/shared/interfaces/request/ProductUpdate';
import { Query } from '@/shared/interfaces/request/Query';
import { ListResponse } from '@/shared/interfaces/response/ListResponse';
import { Product } from '@/shared/interfaces/response/Product';

interface ProductState {
  products: Product[];
  product: Product;
  totalItems: number;
  query: Query;
  isLoading: boolean;
}

export const useProductStore = defineStore('product', {
  state: (): ProductState => ({
    products: [],
    product: {
      id: 0,
      name: '',
      image: '',
      stocks: 0,
      price_range: [],
      description: '',
      variants: [],
    },
    totalItems: 0,
    query: {
      page: 1,
      itemsPerPage: LIMIT_PRODUCT_TABLE,
      sortBy: [],
      search: '',
    },
    isLoading: false,
  }),
  actions: {
    async fetchProducts() {
      this.isLoading = true;
      console.log(useFetchOptions());
      const { data, error } = await useFetch<ListResponse<Product>>(
        '/products/admin/',
        {
          ...useFetchOptions(),
          params: {
            ...convertQueryParam(this.query),
          },
        },
      );
      if (!error.value && data.value) {
        const { results, count } = data.value;
        this.products = results;
        this.totalItems = count;
      }
      this.isLoading = false;
    },
    async fetchProduct(id: number) {
      this.isLoading = true;
      const { data, error } = await useFetch<Product>(
        `/products/admin/${id}/`,
        {
          ...useFetchOptions(),
          query: {
            expand: 'variants',
          },
        },
      );
      if (!error.value) {
        this.product = data.value!;
      }
      this.isLoading = false;
    },
    async createProduct(createData: ProductCreate) {
      this.isLoading = true;
      await useFetch(`/products/admin/`, {
        ...useFetchOptions(),
        method: 'POST',
        body: createData,
      });
      this.isLoading = false;
    },
    async updateProduct(id: number, updateData: ProductUpdate) {
      this.isLoading = true;
      const { error } = await useFetch(`/products/admin/${id}/`, {
        ...useFetchOptions(),
        method: 'PATCH',
        body: updateData,
      });
      if (!error.value) {
        showSnackbar(NotifyType.SUCCESS, 'Product updated successfully');
      }
      this.isLoading = false;
    },
    async bulkDeleteProducts(ids: number[]) {
      this.isLoading = true;

      const { error } = await useFetch('/products/admin/bulk-delete/', {
        ...useFetchOptions(),
        method: 'DELETE',
        body: {
          ids: ids,
        },
      });
      if (!error.value) {
        await this.fetchProducts();
      }
      this.isLoading = false;
    },
  },
});

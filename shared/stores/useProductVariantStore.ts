import { NotifyType } from '@/shared/enums';
import { ProductVariantCreate } from '@/shared/interfaces/request/ProductVariantCreate';
import { ProductVariantUpdate } from '@/shared/interfaces/request/ProductVariantUpdate';
import { ProductVariant } from '@/shared/interfaces/response/ProductVariant';

interface ProductVariantState {
  isLoading: boolean;
}

export const useProductVariantStore = defineStore('productVariant', {
  state: (): ProductVariantState => ({
    isLoading: false,
  }),
  actions: {
    async createVariant(createData: ProductVariantCreate) {
      const { data, error } = await useFetch(`/product-variants/admin/`, {
        ...useFetchOptions(),
        method: 'POST',
        body: createData,
      });
      if (!error.value && data.value) {
        const variant = data.value as ProductVariant;

        useProductStore().product.variants?.pop();
        useProductStore().product.variants?.push(variant);
        showSnackbar(NotifyType.SUCCESS, 'Create successfully.');
      }
    },
    async updateVariant(id: number, updateData: ProductVariantUpdate) {
      const { error } = await useFetch(`/product-variants/admin/${id}/`, {
        ...useFetchOptions(),
        method: 'PATCH',
        body: updateData,
      });
      if (!error.value) {
        showSnackbar(NotifyType.SUCCESS, 'Update successfully.');
      } else {
        showSnackbar(NotifyType.ERROR, 'Failed to update variant.');
      }
    },
    async deleteVariant(id: number) {
      const { error } = await useFetch(`/product-variants/admin/${id}/`, {
        ...useFetchOptions(),
        method: 'DELETE',
      });
      if (!error.value) {
        useProductStore().product.variants?.filter(
          (variant: ProductVariant) => variant.id !== id,
        );
      }
    },
  },
});

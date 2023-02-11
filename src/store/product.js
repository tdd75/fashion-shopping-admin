import axiosInstance from '@/plugins/axios';
import { defineStore } from 'pinia';

export const useProductStore = defineStore('product', {
  state: () => ({
    products: [],
  }),
  actions: {
    async fetchProducts() {
      try {
        const { data } = await axiosInstance.get('/products/admin/');
        this.products = data;
      } catch (err) {
        console.log('🚀 ~ file: auth.js:19 ~ login ~ err', err);
      }
    },
  },
});

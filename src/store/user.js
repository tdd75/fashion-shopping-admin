import axiosInstance from '@/plugins/axios';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    me: null,
  }),
  actions: {
    async getInfo() {
      try {
        const { data } = await axiosInstance.get('/users/me/');
        return (this.me = data);
      } catch (err) {
        console.log('🚀 ~ file: auth.js:19 ~ login ~ err', err);
      }
    },
  },
});

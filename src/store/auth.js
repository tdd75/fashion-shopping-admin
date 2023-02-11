import axiosInstance from '@/plugins/axios';
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    identify: null,
    password: null,
  }),
  actions: {
    async login() {
      try {
        const { data } = await axiosInstance.post('/auth/admin/login/', {
          identify: this.identify,
          password: this.password,
        });
        // set token to local storage and axios header
        localStorage.setItem('access', data['access']);
        localStorage.setItem('refresh', data['refresh']);
        axiosInstance.defaults.headers.common[
          'Authorization'
        ] = `Bearer ${data['access']}`;
        return true;
      } catch (err) {
        console.log('🚀 ~ file: auth.js:19 ~ login ~ err', err);
        return false;
      }
    },
    logout() {
      localStorage.removeItem('access');
      localStorage.removeItem('refresh');
      delete axiosInstance.defaults.headers.common['Authorization'];
      return true;
    },
  },
});

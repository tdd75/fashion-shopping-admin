import { Token } from '@/shared/interfaces/response/Token';
import { tokenStorage } from '@/shared/utils/storage';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    loginForm: {
      identify: null,
      password: null,
    },
  }),
  actions: {
    async login() {
      const { data, error } = await useFetch('/auth/admin/login/', {
        ...useFetchOptions(),
        method: 'POST',
        body: this.loginForm,
      });
      if (!error.value && data.value) {
        const { access, refresh } = data.value as Token;
        // set token to local storage
        tokenStorage.value.access = access;
        tokenStorage.value.refresh = refresh;
        return true;
      } else {
        return false;
      }
    },
    logout() {
      tokenStorage.value.access = null;
      tokenStorage.value.refresh = null;
      return true;
    },
  },
});

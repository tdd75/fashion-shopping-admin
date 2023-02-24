import { Analytic } from '@/shared/interfaces/response/Analytic';

interface OrderState {
  analytic: Analytic;
  isLoading: boolean;
}

export const useAnalyticStore = defineStore('order', {
  state: (): OrderState => ({
    analytic: {
      revenue: [],
      order: [],
    },
    isLoading: false,
  }),
  actions: {
    async getAnalytic() {
      this.isLoading = true;
      const { data, error } = await useFetch<Analytic>('/analytic/', {
        ...useFetchOptions(),
      });
      if (!error.value) {
        this.analytic = data.value!;
      }
      this.isLoading = false;
    },
  },
});

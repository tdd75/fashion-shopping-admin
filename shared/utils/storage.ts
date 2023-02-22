import { useStorage } from '@vueuse/core';

export const tokenStorage = useStorage<{
  access: string | null;
  refresh: string | null;
}>('token', {
  access: null,
  refresh: null,
});

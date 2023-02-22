import { NotifyType } from '@/shared/enums';
import { ROUTE_NAME } from '@/routes';
import { tokenStorage } from '@/shared/utils/storage';

export const useFetchOptions = () => {
  const config = useRuntimeConfig();

  const access = tokenStorage.value.access;
  const headers = {};
  if (access) {
    Object.assign(headers, { Authorization: `Bearer ${access}` });
  }

  return {
    baseURL: config.public.baseURL,
    headers,
    onResponseError(context: any) {
      showSnackbar(
        NotifyType.ERROR,
        context.response._data.detail || context.response._data,
      );
      if (context.response.status === 401) {
        // TODO: try refresh token to get new access token
        navigateTo({
          name: ROUTE_NAME.AUTH.LOGIN,
        });
      }
    },
  };
};

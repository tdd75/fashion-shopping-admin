import { NotifyType } from '@/shared/enums';

export const showSnackbar = (type: NotifyType, message: string) => {
  const appStore = useAppStore();

  appStore.snackbar.message = message;
  Object.assign(appStore.snackbar, {
    show: true,
    type,
    // message,
  });
};

import { NotifyType } from '@/shared/enums';

interface AppState {
  toggleDrawer: boolean;
  snackbar: {
    type: NotifyType;
    show: boolean;
    message: string;
  };
  dialog: {
    type: NotifyType;
    show: boolean;
    title: string;
    content: string;
    confirmText: string;
    onConfirm: VoidFunction;
  };
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    toggleDrawer: true,
    snackbar: {
      type: NotifyType.INFO,
      show: false,
      message: '',
    },
    dialog: {
      type: NotifyType.INFO,
      show: false,
      title: '',
      content: '',
      confirmText: '',
      onConfirm: () => {},
    },
  }),
  actions: {},
});

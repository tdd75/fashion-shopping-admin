import { NotifyType } from '@/shared/enums';

export const showDialog = (
  type: NotifyType,
  title: string,
  content: string,
  confirmText: string,
  onConfirm: VoidFunction,
) => {
  const appStore = useAppStore();

  Object.assign(appStore.dialog, {
    show: true,
    type,
    title,
    content,
    confirmText,
    onConfirm,
  });
};

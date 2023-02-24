import dayjs from 'dayjs';

export const formatMonth = (date: Date) => {
  if (!date) return '';
  return dayjs(date).format('MMMM');
};

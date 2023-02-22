export const enumToCapitalize = (value: string) => {
  return useCapitalize(value.replace(/_/g, ' '));
};

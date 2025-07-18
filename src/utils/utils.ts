export const formatNumber = (value: string | number): string => {
  const num =
    typeof value === 'string' ? Number(value.replace(/[^0-9]/g, '')) : value;

  if (isNaN(num) || num === 0) return '';

  return num.toLocaleString();
};

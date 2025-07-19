export const formatNumber = (value: string | number): string => {
  const num =
    typeof value === 'string' ? Number(value.replace(/[^0-9]/g, '')) : value;

  if (isNaN(num) || num === 0) return '';

  return num.toLocaleString();
};

export function isRepeatedNumber(value: string): boolean {
  if (value.length === 0) return false;
  const isRepeat = value.split('').every((char) => char === value[0]);
  return isRepeat;
}

import { useMutation } from '@tanstack/react-query';
import { postChargeCultureApi } from './charge';

export const usePostChargeCultureApi = () => {
  return useMutation({
    mutationFn: ({ userId, amount }: { userId: string; amount: number }) =>
      postChargeCultureApi({ userId, amount }),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error('상품권 조회 실패:', error);
    },
  });
};

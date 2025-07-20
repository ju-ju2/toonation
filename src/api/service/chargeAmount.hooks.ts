import { useMutation } from '@tanstack/react-query';
import { getChargeAmountApi, postChargeAmountApi } from './chargeAmount';

export const useGetChargeAmountApi = () => {
  return useMutation({
    mutationFn: (id: number) => getChargeAmountApi(id),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error('상품권 조회 실패:', error);
    },
  });
};

export const usePostChargeAmountApi = () => {
  return useMutation({
    mutationFn: ({ userId, amount }: { userId: string; amount: number }) =>
      postChargeAmountApi({ userId, amount }),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error('상품권 조회 실패:', error);
    },
  });
};

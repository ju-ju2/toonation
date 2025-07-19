import { useMutation } from '@tanstack/react-query';
import { getChargeAmountApi } from './chargeAmount';

export const useGetChargeAmountApi = () => {
  return useMutation({
    mutationFn: (id: number) => getChargeAmountApi(id),
    onSuccess: (data) => {
      console.log('상품권 조회 성공:', data);
    },
    onError: (error) => {
      console.error('상품권 조회 실패:', error);
    },
  });
};

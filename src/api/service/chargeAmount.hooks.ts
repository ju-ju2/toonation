import { useMutation } from '@tanstack/react-query';
import { getChargeAmountApi } from './chargeAmount';

export const useGetChargeAmountApi = () => {
  return useMutation({
    mutationFn: (id: number) => getChargeAmountApi(id),
    onSuccess: (data) => {
      return data; // 데이터 처리 로직 추가 가능
    },
    onError: (error) => {
      console.error('상품권 조회 실패:', error);
    },
  });
};

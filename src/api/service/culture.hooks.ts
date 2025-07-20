import { useMutation } from '@tanstack/react-query';
import { getCulturePinApi } from './culture';

export const useGetCulturePinApi = () => {
  return useMutation({
    mutationFn: (id: number) => getCulturePinApi(id),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error('상품권 조회 실패:', error);
    },
  });
};

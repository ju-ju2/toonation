import { useMutation } from '@tanstack/react-query';
import type { PostChargeCardReq, PostChargeCultureReq } from '../type/apiType';
import { postChargeCardApi, postChargeCultureApi } from './charge';

export const usePostChargeCultureApi = () => {
  return useMutation({
    mutationFn: ({ userId, amount }: PostChargeCultureReq) =>
      postChargeCultureApi({ userId, amount }),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error('상품권 충전 실패:', error);
    },
  });
};

export const usePostChargeCardApi = () => {
  return useMutation({
    mutationFn: ({ userId, amount, isDomestic }: PostChargeCardReq) =>
      postChargeCardApi({ userId, amount, isDomestic }),
    onSuccess: (data) => {
      return data;
    },
    onError: (error) => {
      console.error('카드 충전 실패:', error);
    },
  });
};

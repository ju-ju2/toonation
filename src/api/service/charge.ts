import { customRequest, endPoints } from '@/api/endpoint';
import type {
  PostChargeCardReq,
  PostChargeCardRes,
  PostChargeCultureReq,
  PostChargeCultureRes,
} from '@/api/type/apiType';
import type { BaseApiResponse } from '../type/common';

export const postChargeCultureApi = async ({
  userId,
  amount,
}: PostChargeCultureReq): Promise<BaseApiResponse<PostChargeCultureRes>> => {
  const res = await customRequest().post(endPoints.chargeCulture, {
    userId,
    amount,
  });
  return res.data;
};

export const postChargeCardApi = async ({
  userId,
  amount,
  isDomestic,
}: PostChargeCardReq): Promise<BaseApiResponse<PostChargeCardRes>> => {
  const res = await customRequest().post(endPoints.chargeCard, {
    userId,
    amount,
    isDomestic,
  });
  return res.data;
};

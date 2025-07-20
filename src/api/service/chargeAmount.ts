import { customRequest, endPoints } from '@/api/endpoint';
import type {
  GetChargeAmountRes,
  PostChargeAmountReq,
  PostChargeAmountRes,
} from '@/api/type/apiType';
import type { BaseApiResponse } from '../type/common';

export const getChargeAmountApi = async (
  id: number
): Promise<BaseApiResponse<GetChargeAmountRes>> => {
  const res = await customRequest().get(
    endPoints.chargeAmountPin.replace(':number', id.toString())
  );
  return res.data;
};

export const postChargeAmountApi = async ({
  userId,
  amount,
}: PostChargeAmountReq): Promise<BaseApiResponse<PostChargeAmountRes>> => {
  const res = await customRequest().post(endPoints.chargeAmount, {
    userId,
    amount,
  });
  return res.data;
};

import { customRequest, endPoints } from '@/api/endpoint';
import type { ChargeAmountType } from '@/api/type/apiType';
import type { BaseApiResponse } from '../type/common';

export const getChargeAmountApi = async (
  id: number
): Promise<BaseApiResponse<ChargeAmountType[]>> => {
  const res = await customRequest().get(
    endPoints.chargeAmount.replace('{number}', id.toString())
  );
  return res.data;
};

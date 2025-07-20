import { customRequest, endPoints } from '../endpoint';
import type { GetCulturePinRes } from '../type/apiType';
import type { BaseApiResponse } from '../type/common';

export const getCulturePinApi = async (
  id: number
): Promise<BaseApiResponse<GetCulturePinRes>> => {
  const res = await customRequest().get(
    endPoints.chargeCulturePin.replace(':pin', id.toString())
  );
  return res.data;
};

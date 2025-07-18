import { customRequest, endPoints } from '@/api/endpoint';
import type { TestType } from '@/api/type/testType';
import type { BaseApiResponse } from '../type/common';

export const getTestApi = async (): Promise<BaseApiResponse<TestType[]>> => {
  const res = await customRequest().get(endPoints.test);
  return res.data;
};

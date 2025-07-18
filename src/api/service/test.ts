import { customRequest, endPoints } from '@/api/endpoint';
import type { TestType } from '@/api/type/testType';

export const getTestApi = async (): Promise<TestType[]> => {
  const res = await customRequest().get(endPoints.test);
  return res.data;
};

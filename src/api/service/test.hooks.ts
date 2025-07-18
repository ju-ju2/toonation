import { useQuery } from '@tanstack/react-query';
import { endPoints } from '@/api/endpoint';
import { getTestApi } from './test';

export const useGetTestApi = () => {
  return useQuery({
    queryKey: [endPoints.test],
    queryFn: () => getTestApi(),
    throwOnError: true,
    staleTime: 1000 * 60,
  });
};

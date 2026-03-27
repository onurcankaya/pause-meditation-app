import { useQuery } from '@tanstack/react-query';
import { categoryClient } from '@/api/client/categoryClient';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryClient.getAll,
  });
}

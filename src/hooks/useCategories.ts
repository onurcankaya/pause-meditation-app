import { useQuery } from '@tanstack/react-query';
import { categoryClient } from '@/api/client/categoryClient';

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: categoryClient.getAll,
  });
}

export function useCategory(categoryId: string) {
  return useQuery({
    queryKey: ['category', categoryId],
    queryFn: () => categoryClient.get({ id: categoryId }),
    enabled: !!categoryId,
  });
}

export function useMeditationsByCategory(categoryId: string) {
  return useQuery({
    queryKey: ['meditations', categoryId],
    queryFn: () => categoryClient.getMeditationsByCategory(categoryId),
  });
}

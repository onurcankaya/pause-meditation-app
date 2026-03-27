import { useQuery } from '@tanstack/react-query';
import { meditationClient } from '@/api/client/meditationClient';

export function useMeditations(categoryId: string) {
  return useQuery({
    queryKey: ['meditations'],
    queryFn: () => meditationClient.getAll(categoryId),
  });
}

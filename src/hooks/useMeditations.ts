import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { meditationClient } from '@/api/client/meditationClient';

export function useMeditations(categoryId: string) {
  return useQuery({
    queryKey: ['meditations', categoryId],
    queryFn: () => meditationClient.getAll(categoryId),
  });
}

export function useUpdateMeditation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: meditationClient.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['meditations'] });
    },
  });
}

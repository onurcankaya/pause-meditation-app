import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
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
      toast.success('Meditation complete');
    },
  });
}

export function useMeditationProgress() {
  return useQuery({
    queryKey: ['meditationProgress'],
    queryFn: meditationClient.getMeditationProgress,
  });
}

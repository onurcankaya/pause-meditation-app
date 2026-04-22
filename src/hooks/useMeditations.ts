import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { meditationClient } from '@/api/client/meditationClient';

export function useMeditation(meditationId: string) {
  return useQuery({
    queryKey: ['meditation', meditationId],
    queryFn: () => meditationClient.getMeditation(meditationId),
    enabled: !!meditationId,
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

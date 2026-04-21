import { useQuery } from '@tanstack/react-query';
import { meditationClient } from '@/api/client/meditationClient';

export function useMeditationProgress() {
  return useQuery({
    queryKey: ['meditationProgress'],
    queryFn: meditationClient.getMeditationProgress,
  });
}

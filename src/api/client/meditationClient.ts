import { Meditation, CompletedMeditation } from '@/api/types/meditation';

const BASE_URL = '/api';
const MEDITATIONS_URL = `${BASE_URL}/meditations`;

export const meditationClient = {
  getMeditation: async (meditationId: string): Promise<Meditation> => {
    const url = `${MEDITATIONS_URL}/${meditationId}`;

    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch meditation');

    return response.json();
  },

  update: async ({ id }: { id: string }): Promise<Meditation> => {
    const response = await fetch(`${MEDITATIONS_URL}/${id}/complete`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error('Failed to update meditation');

    return response.json();
  },

  getMeditationProgress: async (): Promise<CompletedMeditation[]> => {
    const url = `${MEDITATIONS_URL}/progress`;

    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch meditation progress');

    return response.json();
  },
};

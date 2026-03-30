import { Meditation } from '@/api/types/meditation';

const BASE_URL = '/api';
const MEDITATIONS_URL = `${BASE_URL}/meditations`;

export const meditationClient = {
  getAll: async (categoryId: string): Promise<Meditation[]> => {
    const url = `${MEDITATIONS_URL}/${categoryId}`;

    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch meditations');

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
};

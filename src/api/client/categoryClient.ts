import { Category } from '@/api/types/category';
import { Meditation } from '@/api/types/meditation';

const BASE_URL = '/api';
const CATEGORIES_URL = `${BASE_URL}/categories`;

export const categoryClient = {
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(CATEGORIES_URL);

    if (!response.ok) throw new Error('Failed to fetch meditation categories');

    return response.json();
  },

  get: async ({ id }: { id: string }): Promise<Category> => {
    const response = await fetch(`${CATEGORIES_URL}/${id}`);

    if (!response.ok) throw new Error('Failed to fetch meditation category');

    return response.json();
  },

  getMeditationsByCategory: async (
    categoryId: string,
  ): Promise<Meditation[]> => {
    const url = `${CATEGORIES_URL}/${categoryId}/meditations`;

    const response = await fetch(url);

    if (!response.ok)
      throw new Error('Failed to fetch meditations within category');

    return response.json();
  },
};

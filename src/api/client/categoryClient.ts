import { Category } from '@/api/types/category';

const BASE_URL = '/api';
const CATEGORIES_URL = `${BASE_URL}/categories`;

export const categoryClient = {
  getAll: async (): Promise<Category[]> => {
    const response = await fetch(CATEGORIES_URL);

    if (!response.ok) throw new Error('Failed to fetch meditation categories');

    return response.json();
  },
};

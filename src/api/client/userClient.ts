import { User } from '@/api/types/user';

const BASE_URL = '/api';
const USERS_URL = `${BASE_URL}/users`;

export const userClient = {
  get: async ({ id }: { id: string }): Promise<User> => {
    const response = await fetch(`${USERS_URL}/${id}`);

    if (!response.ok) throw new Error('Failed to fetch user');

    return response.json();
  },
};

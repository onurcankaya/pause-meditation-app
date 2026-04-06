import pool from '@/lib/db';
import { User } from '@/api/types/user';

export class UserModel {
  static async find(email: string): Promise<User['id']> {
    const result = await pool.query('SELECT id FROM users WHERE email = $1', [
      email,
    ]);

    return result.rows[0]?.id;
  }
}

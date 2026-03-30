import pool from '@/lib/db';
import { Meditation } from '@/api/types/meditation';

export class MeditationModel {
  static async findAll(categoryId: string): Promise<Meditation[]> {
    const result = await pool.query(
      'SELECT * FROM meditations WHERE category_id = $1 ORDER BY created_at ASC',
      [categoryId],
    );

    return result.rows;
  }

  static async update(meditationId: string): Promise<void> {
    const query = `UPDATE meditations SET is_completed = true WHERE id = $1`;

    await pool.query(query, [meditationId]);
  }
}

import pool from '@/lib/db';
import { Meditation } from '@/api/types/meditation';

export class MeditationModel {
  static async findAll(
    userId: string,
    categoryId: string,
  ): Promise<Meditation[]> {
    const result = await pool.query(
      `SELECT m.*, 
        EXISTS(
          SELECT 1 FROM user_meditation_progress 
          WHERE user_id = $1 AND meditation_id = m.id
        ) as is_completed
      FROM meditations m
      WHERE category_id = $2 
      ORDER BY day ASC
      `,
      [userId, categoryId],
    );

    return result.rows;
  }

  static async update(userId: string, meditationId: string): Promise<void> {
    await pool.query(
      `
      INSERT INTO user_meditation_progress (user_id, meditation_id) 
      VALUES ($1, $2) 
      ON CONFLICT (user_id, meditation_id) DO NOTHING
    `,
      [userId, meditationId],
    );
  }
}

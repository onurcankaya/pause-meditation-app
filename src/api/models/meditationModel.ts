import pool from '@/lib/db';
import { Meditation, CompletedMeditation } from '@/api/types/meditation';

export class MeditationModel {
  static async findAll(
    userId: string,
    categoryId: string,
  ): Promise<Meditation[]> {
    const result = await pool.query(
      `SELECT m.*,
        CASE
          WHEN EXISTS(
            SELECT 1 FROM user_meditation_progress 
            WHERE user_id = $1 AND meditation_id = m.id
          ) THEN 'completed'
          WHEN m.day = 1 THEN 'unlocked'
          WHEN EXISTS(
            SELECT 1 FROM user_meditation_progress ump
            JOIN meditations prev ON prev.id = ump.meditation_id
            WHERE ump.user_id = $1
            AND prev.category_id = m.category_id
            AND prev.level = m.level
            AND prev.day = m.day - 1
          ) THEN 'unlocked'
          ELSE 'locked'
        END as status
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

  static async findMeditationProgress(
    userId: string,
  ): Promise<CompletedMeditation[]> {
    const result = await pool.query(
      `SELECT * FROM user_meditation_progress WHERE user_id = $1`,
      [userId],
    );

    return result.rows;
  }
}

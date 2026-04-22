import pool from '@/lib/db';
import { Meditation, CompletedMeditation } from '@/api/types/meditation';

export class MeditationModel {
  static async find(meditationId: string): Promise<Meditation> {
    const result = await pool.query(
      `SELECT id, duration_seconds FROM meditations WHERE id = $1`,
      [meditationId],
    );

    return result.rows[0];
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
      `
        SELECT 
          ump.*, 
          m.duration_seconds 
        FROM user_meditation_progress ump 
        JOIN meditations m ON m.id = ump.meditation_id
        WHERE ump.user_id = $1
      `,
      [userId],
    );

    return result.rows;
  }
}

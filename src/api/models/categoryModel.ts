import pool from '@/lib/db';
import { Category } from '@/api/types/category';
import { Meditation } from '@/api/types/meditation';

export class CategoryModel {
  static async findAll(): Promise<Category[]> {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY created_at ASC',
    );

    return result.rows;
  }

  static async find(categoryId: string): Promise<Category> {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [
      categoryId,
    ]);

    return result.rows[0];
  }

  static async findMeditationsByCategory(
    userId: string,
    categoryId: string,
  ): Promise<Meditation[]> {
    const result = await pool.query(
      `
      WITH level_completion AS (
        SELECT 
          m.level,
          COUNT(*)::integer as total_meditations,
          SUM(CASE WHEN ump.meditation_id IS NOT NULL THEN 1 ELSE 0 END)::integer as completed_meditations
        FROM meditations m
        LEFT JOIN user_meditation_progress ump
          ON ump.meditation_id = m.id AND ump.user_id = $1
        WHERE m.category_id = $2
        GROUP BY m.level
      )
      SELECT 
        m.*,
        CASE
          WHEN EXISTS(
            SELECT 1 FROM user_meditation_progress 
            WHERE user_id = $1 AND meditation_id = m.id
          ) THEN 'completed'
          WHEN m.day = 1 AND m.level = 1 THEN 'unlocked'
          WHEN m.day = (SELECT MIN(day) FROM meditations WHERE level = m.level AND category_id = m.category_id)
          AND EXISTS(
            SELECT 1 FROM level_completion lc
            WHERE lc.level = m.level - 1
            AND lc.completed_meditations = lc.total_meditations
          ) THEN 'unlocked'
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
      WHERE m.category_id = $2
      ORDER BY m.level, m.day
      `,
      [userId, categoryId],
    );

    return result.rows;
  }
}

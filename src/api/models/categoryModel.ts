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
}

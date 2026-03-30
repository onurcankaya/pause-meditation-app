import pool from '@/lib/db';
import { Category } from '@/api/types/category';

export class CategoryModel {
  static async findAll(): Promise<Category[]> {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY created_at ASC',
    );

    return result.rows;
  }

  static async find(id: string): Promise<Category> {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [
      id,
    ]);

    return result.rows[0];
  }
}

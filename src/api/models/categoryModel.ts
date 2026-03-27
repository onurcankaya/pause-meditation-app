import pool from '@/lib/db';
import { Category } from '@/api/types/category';

export class CategoryModel {
  static async findAll(): Promise<Category[]> {
    const result = await pool.query(
      'SELECT * FROM categories ORDER BY created_at ASC',
    );

    return result.rows;
  }
}

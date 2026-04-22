import { CategoryModel } from '@/api/models/categoryModel';
import { Category } from '@/api/types/category';
import { Meditation } from '@/api/types/meditation';

export class CategoryService {
  static async getCategories(): Promise<Category[]> {
    return CategoryModel.findAll();
  }

  static async getCategory(categoryId: string): Promise<Category> {
    return CategoryModel.find(categoryId);
  }

  static async getMeditationsByCategory(
    userId: string,
    categoryId: string,
  ): Promise<Meditation[]> {
    if (!categoryId) {
      throw new Error('Invalid category id');
    }

    return CategoryModel.findMeditationsByCategory(userId, categoryId);
  }
}

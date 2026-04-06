import { CategoryModel } from '@/api/models/categoryModel';
import { Category } from '@/api/types/category';

export class CategoryService {
  static async getCategories(): Promise<Category[]> {
    return CategoryModel.findAll();
  }

  static async getCategory(categoryId: string): Promise<Category> {
    return CategoryModel.find(categoryId);
  }
}

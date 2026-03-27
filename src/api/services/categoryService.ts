import { CategoryModel } from '@/api/models/categoryModel';
import { Category } from '@/api/types/category';

export class CategoryService {
  static async getCategories(): Promise<Category[]> {
    return CategoryModel.findAll();
  }
}

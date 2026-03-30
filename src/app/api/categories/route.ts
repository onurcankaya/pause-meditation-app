import { NextResponse } from 'next/server';
import { CategoryService } from '@/api/services/categoryService';

export async function GET() {
  try {
    const categories = await CategoryService.getCategories();

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Categories fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch meditation categories' },
      { status: 500 },
    );
  }
}

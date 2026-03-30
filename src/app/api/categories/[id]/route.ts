import { NextRequest, NextResponse } from 'next/server';
import { CategoryService } from '@/api/services/categoryService';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const category = await CategoryService.getCategory(params.id);

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error('Category fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch meditation category' },
      { status: 500 },
    );
  }
}

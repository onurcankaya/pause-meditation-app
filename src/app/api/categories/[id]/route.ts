import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CategoryService } from '@/api/services/categoryService';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    const categoryId = params.id;

    const category = await CategoryService.getCategory(categoryId);

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    console.error('Category fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch meditation category' },
      { status: 500 },
    );
  }
}

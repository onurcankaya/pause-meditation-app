import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { CategoryService } from '@/api/services/categoryService';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

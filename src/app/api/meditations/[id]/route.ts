import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MeditationService } from '@/api/services/meditationService';

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

    const meditations = await MeditationService.getMeditations(
      session.user.id,
      categoryId,
    );

    return NextResponse.json(meditations);
  } catch (error) {
    console.error('Meditations fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch meditations' },
      { status: 500 },
    );
  }
}

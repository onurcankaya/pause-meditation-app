import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MeditationService } from '@/api/services/meditationService';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const meditations = await MeditationService.getMeditationProgress(
      session.user.id,
    );

    return NextResponse.json(meditations);
  } catch (error) {
    console.error('Meditation progress fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch meditation progress' },
      { status: 500 },
    );
  }
}

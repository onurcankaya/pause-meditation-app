import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { MeditationService } from '@/api/services/meditationService';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const params = await context.params;
    const meditationId = params.id;

    await MeditationService.updateMeditation(session.user.id, meditationId);

    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error('Failed to mark meditation complete:', error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : 'Failed to update completion status',
      },
      { status: 400 },
    );
  }
}

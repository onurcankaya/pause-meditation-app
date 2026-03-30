import { NextRequest, NextResponse } from 'next/server';
import { MeditationService } from '@/api/services/meditationService';

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    await MeditationService.updateMeditation(params.id);

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

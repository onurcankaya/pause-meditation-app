import { NextRequest, NextResponse } from 'next/server';
import { MeditationService } from '@/api/services/meditationService';

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> },
) {
  try {
    const params = await context.params;
    const categoryId = params.id;

    const meditations = await MeditationService.getMeditations(categoryId);

    return NextResponse.json(meditations);
  } catch (error) {
    console.error('Meditations fetch error:', error);

    return NextResponse.json(
      { error: 'Failed to fetch meditations' },
      { status: 500 },
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { MeditationService } from '@/api/services/meditationService';

export async function GET(request: NextRequest) {
  try {
    const categoryId = '';
    const meditations = await MeditationService.getMeditations(categoryId);

    return NextResponse.json(meditations);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch meditations' },
      { status: 500 },
    );
  }
}

import { MeditationModel } from '@/api/models/meditationModel';
import { Meditation, CompletedMeditation } from '@/api/types/meditation';

export class MeditationService {
  static async getMeditation(meditationId: string): Promise<Meditation> {
    if (!meditationId) {
      throw new Error('Invalid meditation id');
    }

    return MeditationModel.find(meditationId);
  }

  static async updateMeditation(
    userId: string,
    meditationId: string,
  ): Promise<void> {
    if (!meditationId) {
      throw new Error('Invalid meditation id');
    }

    return MeditationModel.update(userId, meditationId);
  }

  static async getMeditationProgress(
    userId: string,
  ): Promise<CompletedMeditation[]> {
    return MeditationModel.findMeditationProgress(userId);
  }
}

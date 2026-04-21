import { MeditationModel } from '@/api/models/meditationModel';
import { Meditation, CompletedMeditation } from '@/api/types/meditation';

export class MeditationService {
  static async getMeditations(
    userId: string,
    categoryId: string,
  ): Promise<Meditation[]> {
    if (!categoryId) {
      throw new Error('Invalid category id');
    }

    return MeditationModel.findAll(userId, categoryId);
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

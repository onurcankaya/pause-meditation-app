import { MeditationModel } from '@/api/models/meditationModel';
import { Meditation } from '@/api/types/meditation';

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

    MeditationModel.update(userId, meditationId);
  }
}

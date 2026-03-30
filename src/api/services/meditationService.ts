import { MeditationModel } from '@/api/models/meditationModel';
import { Meditation } from '@/api/types/meditation';

export class MeditationService {
  static async getMeditations(categoryId: string): Promise<Meditation[]> {
    return MeditationModel.findAll(categoryId);
  }

  static async updateMeditation(meditationId: string): Promise<void> {
    if (!meditationId) {
      throw new Error('Invalid meditation id');
    }

    MeditationModel.update(meditationId);
  }
}

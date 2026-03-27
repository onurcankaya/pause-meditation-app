import { MeditationModel } from '@/api/models/meditationModel';
import { Meditation } from '@/api/types/meditation';

export class MeditationService {
  static async getMeditations(categoryId: string): Promise<Meditation[]> {
    return MeditationModel.findAll(categoryId);
  }
}

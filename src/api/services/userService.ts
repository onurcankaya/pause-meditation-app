import { UserModel } from '@/api/models/userModel';
import { User } from '@/api/types/user';

export class UserService {
  static async getUserId(email: string): Promise<User['email']> {
    if (!email) {
      throw new Error('Invalid user email');
    }

    return UserModel.find(email);
  }
}

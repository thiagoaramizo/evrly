import { UserTargetI } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.model';
import { config } from '../config/env';
import { SetTargetException } from '../../application/exceptions/set-target.exception';

export class UserTargetToN8N implements UserTargetI {

  private apiUrl: string;

  constructor() {
    this.apiUrl = config.TARGET_API_URL;
  }

  async setUsers(users: User[]): Promise<void> {
    try {
      const response = await fetch(`${this.apiUrl}/webhook/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ users }),
      });

      if (!response.ok) {
        throw new SetTargetException(
          `Failed to set users: ${response.status} ${response.statusText}`
        );
      }
      return;
    } catch (error) {
      throw new SetTargetException(
        error instanceof Error ? error.message : "Unknown error setting users"
      );
    }
  }
}

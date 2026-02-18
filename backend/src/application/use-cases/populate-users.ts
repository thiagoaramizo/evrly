import { UserSourceI, UserTargetI } from "../../domain/user/user.repository";
import { AppException } from "../exceptions/app.exception";
import { InternalException } from "../exceptions/internal.exception";

export class PopulateUsers {
  constructor(
    private readonly userSource: UserSourceI,
    private readonly userTarget: UserTargetI
  ) {
  }

  async execute(): Promise<{ success: boolean; errorMessage?: string; }> {
    try {
      const users = await this.userSource.getUsers();
      await this.userTarget.setUsers(users);
      return { success: true };
    } catch (error) {
      if (error instanceof AppException) {
        return { success: false, errorMessage: error.message };
      }
      else {
        throw new InternalException('Internal server error');
      }
    }
  }
}
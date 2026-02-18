import { User } from './user.model';

export interface UserSourceI {
  getUsers(): Promise<User[]>
}

export interface UserTargetI {
  setUsers(users: User[]): Promise<void>
}
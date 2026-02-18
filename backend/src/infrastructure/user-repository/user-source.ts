import { UserSourceI } from '../../domain/user/user.repository';
import { User } from '../../domain/user/user.model';
import { ResponseSourceUser } from './dto/ResponseSourceUser';
import { decryptAes256Gcm } from './lib/decrypt-aes-256-gcm';
import { config } from '../config/env';
import { GetSourceException } from '../../application/exceptions/get-source.exception';
import { DecryptException } from '../../application/exceptions/decrypt.exception';
import { AppException } from '../../application/exceptions/app.exception';

export class UserSourceFromApi implements UserSourceI {

  private apiUrl: string;

  constructor() {
    this.apiUrl = config.SOURCE_API_URL;
  }

  private async fetchApi() : Promise<ResponseSourceUser> {
    try {
      const response = await fetch(this.apiUrl);
      
      if (!response.ok) {
        throw new GetSourceException(
          `Failed to fetch users: ${response.status} ${response.statusText}`
        );
      }

      return await response.json() as ResponseSourceUser;
    } catch (error) {
      throw new GetSourceException(
        error instanceof Error ? error.message : "Unknown error fetching users"
      );
    }
  }

  private async decryptUsers(data: ResponseSourceUser): Promise<User[]> {
    try {
      const users = decryptAes256Gcm<{
        row_number: number,
        id: number,
        nome: string,
        email: string,
        telefone: string,
      }[]>({
        iv: data.data.encrypted.iv,
        authTag: data.data.encrypted.authTag,
        encrypted: data.data.encrypted.encrypted,
        secretKey: data.data.secretKey,
        algorithm: data.data.algorithm,
      });
      return users.map(user => new User({
        id: user.id,
        nome: user.nome,
        email: user.email,
        phone: user.telefone,
      }));
    } catch (error) {
      throw new DecryptException(
        error instanceof Error ? error.message : "Error decrypting users payload"
      );
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const data = await this.fetchApi();
      const users = await this.decryptUsers(data);
      return users;
    } catch (error) {
      if (error instanceof AppException) {
        throw error;
      }

      throw new GetSourceException(
        error instanceof Error ? error.message : "Unknown error fetching users"
      );
    }
  }
}

import { AppException } from "./app.exception";

export class DecryptException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
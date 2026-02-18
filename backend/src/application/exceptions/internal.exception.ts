import { AppException } from "./app.exception";

export class InternalException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
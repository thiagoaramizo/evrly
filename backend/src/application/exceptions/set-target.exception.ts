import { AppException } from "./app.exception";

export class SetTargetException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
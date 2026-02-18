import { AppException } from "./app.exception";

export class N8nException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
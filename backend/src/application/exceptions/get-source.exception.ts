import { AppException } from "./app.exception";

export class GetSourceException extends AppException {
  constructor(message: string) {
    super(message);
  }
}
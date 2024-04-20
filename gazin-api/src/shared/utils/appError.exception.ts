import { HttpException } from '@nestjs/common';

interface ErrorFormat {
  status: number;
  message: string;
  id: string;
  error?: any;
}

export class AppError extends HttpException {
  constructor({ status, message, id, error }: ErrorFormat) {
    console.error(`${id}: ${message}`, error || '');
    super({ id, message }, status);
  }
}
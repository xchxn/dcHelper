import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getNumber(a : number, b : number ): number {
    return a + b;
  }
}

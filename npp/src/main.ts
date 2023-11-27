import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() { //부팅을 의미하는 boot
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3001);
}
bootstrap();

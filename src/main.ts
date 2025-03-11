import { NestFactory } from '@nestjs/core';
// Use relative path for AppModule
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Add global prefix (optional)
  app.setGlobalPrefix('api');

  app.enableCors();

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();

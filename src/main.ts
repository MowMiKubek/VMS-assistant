import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { TypeOrmExceptionFilter } from './vehicle/filters/typeorm-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // optional - this will throw an error if non-whitelist field is provided in request body
    // forbidNonWhitelisted: true 
  }));
  app.useGlobalFilters(new TypeOrmExceptionFilter());
  await app.listen(3000);
}
bootstrap();

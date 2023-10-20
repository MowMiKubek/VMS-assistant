import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { TypeOrmExceptionFilter } from './filters/typeorm-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    // optional - this will throw an error if non-whitelist field is provided in request body
    // forbidNonWhitelisted: true 
  }));
  app.useGlobalFilters(new TypeOrmExceptionFilter());

  // CORS setup
  app.setGlobalPrefix('api');
  app.enableCors();

  // Swagger setup
  const config = new DocumentBuilder()
  .setTitle('Vehicle managment system')
  .setDescription('Documentation for vehicle managment system')
  .setVersion('1.0')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    description: 'Enter JWT token in the format \'Bearer token\'',
    in: 'header',
  })
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  
  await app.listen(process.env.PORT || 3000);
}
bootstrap();

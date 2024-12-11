import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppRouterModule } from './app.router';

async function bootstrap() {
  const app = await NestFactory.create(AppRouterModule, { cors: true });

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const config = new DocumentBuilder()
    .setTitle('Enduro For Tri API')
    .setDescription(
      'This is the API documentation for the Enduro For Tri project. This project is a platform for triathletes to share their training data and connect with other triathletes.',
    )
    .addGlobalParameters({
      in: 'header',
      name: 'Authorization',
      required: true,
    })
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);

  console.log(`Application is running on: ${process.pid}`);
}
bootstrap();

import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { rabbitMQConfig } from './config/rabbitmq.config';
import { createDocument } from './config/swagger.config';
import { AppConfig, RMQConfig } from './config/app.config';
import { REST_VALIDATION_OPTIONS } from './common/common.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const { port } = configService.get<AppConfig>('app');
  const { queue, url } = configService.get<RMQConfig>('rmq');

  app.useGlobalPipes(new ValidationPipe(REST_VALIDATION_OPTIONS));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const rmqConfig = rabbitMQConfig({
    queue: queue,
    urls: [url],
  });

  app.connectMicroservice<MicroserviceOptions>(rmqConfig);

  createDocument(app);

  await app.startAllMicroservices();
  await app.listen(port);
}
bootstrap();

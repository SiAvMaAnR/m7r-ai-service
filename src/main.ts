import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { rabbitMQConfig } from './config/rabbitmq.config';
import { createDocument } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService = app.get(ConfigService);

  const appPort = configService.get('app.port');
  const rmqQueue = configService.get('rmq.queue');
  const rmqUrl = configService.get('rmq.url');

  const rmqConfig = rabbitMQConfig({
    queue: rmqQueue,
    urls: [rmqUrl],
  });

  app.connectMicroservice<MicroserviceOptions>(rmqConfig);

  createDocument(app);

  await app.startAllMicroservices();
  await app.listen(appPort);
}
bootstrap();

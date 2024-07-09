import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions } from '@nestjs/microservices';
import { rabbitMQConfig } from './common/common.broker';

async function bootstrap() {
  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   rabbitMQConfig,
  // );

  // await app.listen();

  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>(rabbitMQConfig);

  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();

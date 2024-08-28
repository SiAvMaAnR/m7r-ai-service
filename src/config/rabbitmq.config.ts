import { MicroserviceOptions, Transport } from '@nestjs/microservices';

type RMQConfigArgsT = {
  urls: Array<string>;
  queue: string;
};

const rabbitMQConfig = (args: RMQConfigArgsT): MicroserviceOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: args.urls,
    queue: args.queue,
    queueOptions: {
      durable: true,
    },
  },
});

export { rabbitMQConfig };

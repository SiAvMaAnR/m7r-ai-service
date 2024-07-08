import { MicroserviceOptions, Transport } from '@nestjs/microservices';

const rabbitMQConfig: MicroserviceOptions = {
  transport: Transport.RMQ,
  options: {
    urls: ['amqp://localhost:5672'],
    queue: 'ai__queue',
    queueOptions: {
      durable: false,
    },
  },
};

export { rabbitMQConfig };

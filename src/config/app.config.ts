export const config = (): Config => ({
  app: {
    port: parseInt(process.env.APP_PORT),
  },
  rmq: {
    queue: process.env.RMQ_QUEUE,
    url: process.env.RMQ_URL,
  },
  db: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
});

export interface AppConfig {
  port: number;
}

export interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export interface RMQConfig {
  queue: string;
  url: string;
}

export interface Config {
  app: AppConfig;
  db: DbConfig;
  rmq: RMQConfig;
}

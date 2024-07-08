export default (): Config => ({
  db: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
  },
});

export interface DbConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export interface Config {
  db: DbConfig;
}

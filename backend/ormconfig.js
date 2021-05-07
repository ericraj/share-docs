module.exports = {
  type: "postgres",
  host: "localhost",
  port: process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ["dist/entities/*.js"],
  migrations: ["dist/migrations/*.js"]
};

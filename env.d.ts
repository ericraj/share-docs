declare namespace NodeJS {
  interface ProcessEnv {
    POSTGRES_PORT: string;
    POSTGRES_USER: string;
    POSTGRES_PASSWORD: string;
    POSTGRES_DB: string;
    PGADMIN_PORT: string;
    PGADMIN_DEFAULT_EMAIL: string;
    PGADMIN_DEFAULT_PASSWORD: string;
    PGADMIN_CONFIG_SERVER_MODE: string;
    REDIS_PORT: string;
    REDIS_REPLICATION_MODE: string;
    RABBITMQ_AMQP_PORT: string;
    RABBITMQ_HTTP_PORT: string;
    RABBITMQ_DEFAULT_USER: string;
    RABBITMQ_DEFAULT_PASS: string;
  }
}

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
  }
}

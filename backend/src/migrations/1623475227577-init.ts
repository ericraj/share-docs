import { MigrationInterface, QueryRunner } from "typeorm";

export default class init1623475227577 implements MigrationInterface {
  name = "init1623475227577";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_2d7e06f29424dbb29a827a7c1b5" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_ef64f7e328499bf8489c153b984" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_ef64f7e328499bf8489c153b984"`
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_2d7e06f29424dbb29a827a7c1b5"`
    );
    await queryRunner.query(`DROP TABLE "categories"`);
  }
}

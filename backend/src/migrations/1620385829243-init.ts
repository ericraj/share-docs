import { MigrationInterface, QueryRunner } from "typeorm";

export class init1620385829243 implements MigrationInterface {
  name = "init1620385829243";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "documents" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "categoryId" integer NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_ac51aa5181ee2036f5ca482857c" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "categories" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `CREATE TABLE "documents_tags" ("documentId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_d3b087f9cf8ee18ffaf3393ca2b" PRIMARY KEY ("documentId", "tagId"))`
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_df7a1de23f4d915b5c4a732404" ON "documents_tags" ("documentId") `
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b032c3723f95d2823d7e13861e" ON "documents_tags" ("tagId") `
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_2d7e06f29424dbb29a827a7c1b5" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE`
    );
    await queryRunner.query(
      `ALTER TABLE "documents" ADD CONSTRAINT "FK_e5beef6eb645b82933f1e577a53" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "tags" ADD CONSTRAINT "FK_2e4d4772ece57ca55037ebaacc3" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" ADD CONSTRAINT "FK_ef64f7e328499bf8489c153b984" FOREIGN KEY ("creatorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "documents_tags" ADD CONSTRAINT "FK_df7a1de23f4d915b5c4a7324046" FOREIGN KEY ("documentId") REFERENCES "documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "documents_tags" ADD CONSTRAINT "FK_b032c3723f95d2823d7e13861e6" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "documents_tags" DROP CONSTRAINT "FK_b032c3723f95d2823d7e13861e6"`
    );
    await queryRunner.query(
      `ALTER TABLE "documents_tags" DROP CONSTRAINT "FK_df7a1de23f4d915b5c4a7324046"`
    );
    await queryRunner.query(
      `ALTER TABLE "categories" DROP CONSTRAINT "FK_ef64f7e328499bf8489c153b984"`
    );
    await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_2e4d4772ece57ca55037ebaacc3"`);
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_e5beef6eb645b82933f1e577a53"`
    );
    await queryRunner.query(
      `ALTER TABLE "documents" DROP CONSTRAINT "FK_2d7e06f29424dbb29a827a7c1b5"`
    );
    await queryRunner.query(`DROP INDEX "IDX_b032c3723f95d2823d7e13861e"`);
    await queryRunner.query(`DROP INDEX "IDX_df7a1de23f4d915b5c4a732404"`);
    await queryRunner.query(`DROP TABLE "documents_tags"`);
    await queryRunner.query(`DROP TABLE "categories"`);
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(`DROP TABLE "tags"`);
    await queryRunner.query(`DROP TABLE "documents"`);
  }
}

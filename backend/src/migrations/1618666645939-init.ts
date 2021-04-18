import {MigrationInterface, QueryRunner} from "typeorm";

export class init1618666645939 implements MigrationInterface {
    name = 'init1618666645939'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "document" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "link" character varying NOT NULL, "categoryId" integer NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "creatorId" integer NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "document_tags_tag" ("documentId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_2dff2376093948866b598043842" PRIMARY KEY ("documentId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_28f06e065d929a5fccf1537bb2" ON "document_tags_tag" ("documentId") `);
        await queryRunner.query(`CREATE INDEX "IDX_c8acaaf3e1aaefc8d3c9607863" ON "document_tags_tag" ("tagId") `);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_5b18ea09bcb701252fc224bcbf2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_324214ce924a77d378d986a20de" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_07caa6f5e5a4ebf9a46c65669eb" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_030a9e2ed176dfa1ab471de612f" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_tags_tag" ADD CONSTRAINT "FK_28f06e065d929a5fccf1537bb2c" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_tags_tag" ADD CONSTRAINT "FK_c8acaaf3e1aaefc8d3c9607863c" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document_tags_tag" DROP CONSTRAINT "FK_c8acaaf3e1aaefc8d3c9607863c"`);
        await queryRunner.query(`ALTER TABLE "document_tags_tag" DROP CONSTRAINT "FK_28f06e065d929a5fccf1537bb2c"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_030a9e2ed176dfa1ab471de612f"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_07caa6f5e5a4ebf9a46c65669eb"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_324214ce924a77d378d986a20de"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_5b18ea09bcb701252fc224bcbf2"`);
        await queryRunner.query(`DROP INDEX "IDX_c8acaaf3e1aaefc8d3c9607863"`);
        await queryRunner.query(`DROP INDEX "IDX_28f06e065d929a5fccf1537bb2"`);
        await queryRunner.query(`DROP TABLE "document_tags_tag"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "document"`);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class addCategoryAndTagEntities1618157751509 implements MigrationInterface {
    name = 'addCategoryAndTagEntities1618157751509'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag_documents_document" ("tagId" integer NOT NULL, "documentId" integer NOT NULL, CONSTRAINT "PK_98f0cb419a05c45d4f8a1572af2" PRIMARY KEY ("tagId", "documentId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_91b5f8f511ae5347466820f420" ON "tag_documents_document" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_f10d1c2f5006e576e099c4db7d" ON "tag_documents_document" ("documentId") `);
        await queryRunner.query(`ALTER TABLE "document" ADD "categoryId" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_5b18ea09bcb701252fc224bcbf2" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_documents_document" ADD CONSTRAINT "FK_91b5f8f511ae5347466820f420e" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag_documents_document" ADD CONSTRAINT "FK_f10d1c2f5006e576e099c4db7dc" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_documents_document" DROP CONSTRAINT "FK_f10d1c2f5006e576e099c4db7dc"`);
        await queryRunner.query(`ALTER TABLE "tag_documents_document" DROP CONSTRAINT "FK_91b5f8f511ae5347466820f420e"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_5b18ea09bcb701252fc224bcbf2"`);
        await queryRunner.query(`ALTER TABLE "document" DROP COLUMN "categoryId"`);
        await queryRunner.query(`DROP INDEX "IDX_f10d1c2f5006e576e099c4db7d"`);
        await queryRunner.query(`DROP INDEX "IDX_91b5f8f511ae5347466820f420"`);
        await queryRunner.query(`DROP TABLE "tag_documents_document"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "tag"`);
    }

}

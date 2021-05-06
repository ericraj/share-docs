import {MigrationInterface, QueryRunner} from "typeorm";

export class onDeleteCascadeCategoryDocuments1620306184332 implements MigrationInterface {
    name = 'onDeleteCascadeCategoryDocuments1620306184332'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_37700a821585c3e96327ae374be"`);
        await queryRunner.query(`ALTER TABLE "document" DROP CONSTRAINT "FK_3af38da2e4759153e20d2fb9649"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_4dc1f22632969cc945178cd6e12"`);
        await queryRunner.query(`ALTER TABLE "category" DROP CONSTRAINT "FK_057a6810c8f3810e6c6e3087ab3"`);
        await queryRunner.query(`ALTER TABLE "document_tags_tag" DROP CONSTRAINT "FK_5316a0d4f5371898503239eee52"`);
        await queryRunner.query(`ALTER TABLE "document_tags_tag" DROP CONSTRAINT "FK_d2e6688618c7010b4ea8c7bfb6d"`);
        await queryRunner.query(`DROP INDEX "IDX_5316a0d4f5371898503239eee5"`);
        await queryRunner.query(`DROP INDEX "IDX_d2e6688618c7010b4ea8c7bfb6"`);
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
        await queryRunner.query(`CREATE INDEX "IDX_d2e6688618c7010b4ea8c7bfb6" ON "document_tags_tag" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5316a0d4f5371898503239eee5" ON "document_tags_tag" ("documentId") `);
        await queryRunner.query(`ALTER TABLE "document_tags_tag" ADD CONSTRAINT "FK_d2e6688618c7010b4ea8c7bfb6d" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document_tags_tag" ADD CONSTRAINT "FK_5316a0d4f5371898503239eee52" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "category" ADD CONSTRAINT "FK_057a6810c8f3810e6c6e3087ab3" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_4dc1f22632969cc945178cd6e12" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_3af38da2e4759153e20d2fb9649" FOREIGN KEY ("creatorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "document" ADD CONSTRAINT "FK_37700a821585c3e96327ae374be" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

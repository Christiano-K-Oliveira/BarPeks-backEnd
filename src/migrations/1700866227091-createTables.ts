import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1700866227091 implements MigrationInterface {
    name = 'CreateTables1700866227091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" DROP CONSTRAINT "FK_ef8e24ceb1eb15a93310cc61c47"`);
        await queryRunner.query(`ALTER TABLE "plans" ADD CONSTRAINT "FK_ef8e24ceb1eb15a93310cc61c47" FOREIGN KEY ("pubId") REFERENCES "pubs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" DROP CONSTRAINT "FK_ef8e24ceb1eb15a93310cc61c47"`);
        await queryRunner.query(`ALTER TABLE "plans" ADD CONSTRAINT "FK_ef8e24ceb1eb15a93310cc61c47" FOREIGN KEY ("pubId") REFERENCES "pubs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

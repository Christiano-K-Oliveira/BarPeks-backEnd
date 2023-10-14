import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumn1697158875063 implements MigrationInterface {
    name = 'AddColumn1697158875063'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rescue_history" ADD "code_rescue" character varying(10) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rescue_history" DROP COLUMN "code_rescue"`);
    }

}

import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumn1697305701055 implements MigrationInterface {
    name = 'AddColumn1697305701055'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rescue_history" ADD "rescue_date" character varying(20)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rescue_history" DROP COLUMN "rescue_date"`);
    }

}

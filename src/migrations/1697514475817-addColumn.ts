import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumn1697514475817 implements MigrationInterface {
    name = 'AddColumn1697514475817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registered_clients" ADD "old_points" character varying(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registered_clients" DROP COLUMN "old_points"`);
    }

}

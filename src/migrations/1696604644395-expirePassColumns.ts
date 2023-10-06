import { MigrationInterface, QueryRunner } from "typeorm";

export class ExpirePassColumns1696604644395 implements MigrationInterface {
    name = 'ExpirePassColumns1696604644395'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clients" ADD "expires_reset_password" character varying`);
        await queryRunner.query(`ALTER TABLE "pubs" ADD "expires_reset_password" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pubs" DROP COLUMN "expires_reset_password"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP COLUMN "expires_reset_password"`);
    }

}

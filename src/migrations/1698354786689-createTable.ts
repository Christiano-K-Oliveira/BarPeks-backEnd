import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1698354786689 implements MigrationInterface {
    name = 'CreateTable1698354786689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" RENAME COLUMN "update_at" TO "updated_at"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "plans" RENAME COLUMN "updated_at" TO "update_at"`);
    }

}

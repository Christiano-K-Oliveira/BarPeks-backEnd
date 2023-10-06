import { MigrationInterface, QueryRunner } from "typeorm";

export class ModifyingColumns1696524576038 implements MigrationInterface {
    name = 'ModifyingColumns1696524576038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "rescue_history" DROP COLUMN "pub_name"`);
        await queryRunner.query(`ALTER TYPE "public"."rescue_history_status_enum" RENAME TO "rescue_history_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."rescue_history_status_enum" AS ENUM('disponivel', 'resgatado')`);
        await queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" TYPE "public"."rescue_history_status_enum" USING "status"::"text"::"public"."rescue_history_status_enum"`);
        await queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" SET DEFAULT 'disponivel'`);
        await queryRunner.query(`DROP TYPE "public"."rescue_history_status_enum_old"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."rescue_history_status_enum_old" AS ENUM('disponível', 'resgatado')`);
        await queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" TYPE "public"."rescue_history_status_enum_old" USING "status"::"text"::"public"."rescue_history_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" SET DEFAULT 'disponível'`);
        await queryRunner.query(`DROP TYPE "public"."rescue_history_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."rescue_history_status_enum_old" RENAME TO "rescue_history_status_enum"`);
        await queryRunner.query(`ALTER TABLE "rescue_history" ADD "pub_name" character varying(150) NOT NULL`);
    }

}

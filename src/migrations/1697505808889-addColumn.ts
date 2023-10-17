import { MigrationInterface, QueryRunner } from "typeorm";

export class AddColumn1697505808889 implements MigrationInterface {
    name = 'AddColumn1697505808889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registered_clients" ADD "link_qrcode" character varying(10)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "registered_clients" DROP COLUMN "link_qrcode"`);
    }

}

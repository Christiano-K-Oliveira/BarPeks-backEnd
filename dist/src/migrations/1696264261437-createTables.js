"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTables1696264261437 = void 0;
class CreateTables1696264261437 {
    constructor() {
        this.name = 'CreateTables1696264261437';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "birth_date" character varying(10) NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying(80) NOT NULL, "password" character varying(120) NOT NULL, "reset_password" character varying(120), "telephone" character varying(11) NOT NULL, "photo_url" character varying, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "pubs" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "social_number" character varying(14) NOT NULL, "email" character varying(80) NOT NULL, "password" character varying(120) NOT NULL, "reset_password" character varying(120), "telephone" character varying(11) NOT NULL, "address" character varying(150) NOT NULL, "state" character varying(60) NOT NULL, "city" character varying(60) NOT NULL, "postal_code" character varying(8) NOT NULL, "photo_url" character varying, "is_active" boolean NOT NULL DEFAULT true, CONSTRAINT "PK_98a3fd9d0f3d37cb3d1c97faa27" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "products" ("id" SERIAL NOT NULL, "name" character varying(80) NOT NULL, "value" character varying(8) NOT NULL, "code" character varying(10) NOT NULL, "photo_url" character varying, "pubId" integer, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TYPE "public"."rescue_history_status_enum" AS ENUM('disponível', 'resgatado')`);
            yield queryRunner.query(`CREATE TABLE "rescue_history" ("id" SERIAL NOT NULL, "status" "public"."rescue_history_status_enum" NOT NULL DEFAULT 'disponível', "date" date NOT NULL DEFAULT now(), "reward_name" character varying(80) NOT NULL, "pub_name" character varying(150) NOT NULL, "clientId" integer, "pubId" integer, CONSTRAINT "PK_39f352b5926d022cafd83e2744d" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "registered_clients" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "cpf" character varying(11) NOT NULL, "email" character varying(80) NOT NULL, "telephone" character varying(11) NOT NULL, "points" character varying(6) NOT NULL, "clientId" integer, "pubId" integer, CONSTRAINT "PK_e628d45dc972e2be3bdf54fbc68" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_fa12b1f1b3296c45569572502c1" FOREIGN KEY ("pubId") REFERENCES "pubs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" ADD CONSTRAINT "FK_ad9cb13932f2117f79361609148" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" ADD CONSTRAINT "FK_4761456b4daad0d85081cd88a7b" FOREIGN KEY ("pubId") REFERENCES "pubs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "registered_clients" ADD CONSTRAINT "FK_627a1cd6fc2987686d802992b32" FOREIGN KEY ("clientId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "registered_clients" ADD CONSTRAINT "FK_0b0e907a26263c176a3696a975e" FOREIGN KEY ("pubId") REFERENCES "pubs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "registered_clients" DROP CONSTRAINT "FK_0b0e907a26263c176a3696a975e"`);
            yield queryRunner.query(`ALTER TABLE "registered_clients" DROP CONSTRAINT "FK_627a1cd6fc2987686d802992b32"`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" DROP CONSTRAINT "FK_4761456b4daad0d85081cd88a7b"`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" DROP CONSTRAINT "FK_ad9cb13932f2117f79361609148"`);
            yield queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_fa12b1f1b3296c45569572502c1"`);
            yield queryRunner.query(`DROP TABLE "registered_clients"`);
            yield queryRunner.query(`DROP TABLE "rescue_history"`);
            yield queryRunner.query(`DROP TYPE "public"."rescue_history_status_enum"`);
            yield queryRunner.query(`DROP TABLE "products"`);
            yield queryRunner.query(`DROP TABLE "pubs"`);
            yield queryRunner.query(`DROP TABLE "clients"`);
        });
    }
}
exports.CreateTables1696264261437 = CreateTables1696264261437;

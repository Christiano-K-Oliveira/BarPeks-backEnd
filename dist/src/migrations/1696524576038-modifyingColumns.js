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
exports.ModifyingColumns1696524576038 = void 0;
class ModifyingColumns1696524576038 {
    constructor() {
        this.name = 'ModifyingColumns1696524576038';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "rescue_history" DROP COLUMN "pub_name"`);
            yield queryRunner.query(`ALTER TYPE "public"."rescue_history_status_enum" RENAME TO "rescue_history_status_enum_old"`);
            yield queryRunner.query(`CREATE TYPE "public"."rescue_history_status_enum" AS ENUM('disponivel', 'resgatado')`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" TYPE "public"."rescue_history_status_enum" USING "status"::"text"::"public"."rescue_history_status_enum"`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" SET DEFAULT 'disponivel'`);
            yield queryRunner.query(`DROP TYPE "public"."rescue_history_status_enum_old"`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TYPE "public"."rescue_history_status_enum_old" AS ENUM('disponível', 'resgatado')`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" DROP DEFAULT`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" TYPE "public"."rescue_history_status_enum_old" USING "status"::"text"::"public"."rescue_history_status_enum_old"`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" ALTER COLUMN "status" SET DEFAULT 'disponível'`);
            yield queryRunner.query(`DROP TYPE "public"."rescue_history_status_enum"`);
            yield queryRunner.query(`ALTER TYPE "public"."rescue_history_status_enum_old" RENAME TO "rescue_history_status_enum"`);
            yield queryRunner.query(`ALTER TABLE "rescue_history" ADD "pub_name" character varying(150) NOT NULL`);
        });
    }
}
exports.ModifyingColumns1696524576038 = ModifyingColumns1696524576038;

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
exports.CreateTransactionEntity1680704763649 = void 0;
class CreateTransactionEntity1680704763649 {
    constructor() {
        this.name = 'CreateTransactionEntity1680704763649';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "block_hash" character varying NOT NULL, "block_number" integer NOT NULL, "balance_address_from" character varying NOT NULL, "from" character varying NOT NULL, "balance_address_to" character varying NOT NULL, "to" character varying NOT NULL, "value" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE INDEX "IDX_290df3897fac99713afb5f3d7a" ON "transaction" ("from") `);
            yield queryRunner.query(`CREATE INDEX "IDX_1713783ebe978fa2ae9654e4bb" ON "transaction" ("to") `);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`DROP INDEX "public"."IDX_1713783ebe978fa2ae9654e4bb"`);
            yield queryRunner.query(`DROP INDEX "public"."IDX_290df3897fac99713afb5f3d7a"`);
            yield queryRunner.query(`DROP TABLE "transaction"`);
        });
    }
}
exports.CreateTransactionEntity1680704763649 = CreateTransactionEntity1680704763649;
//# sourceMappingURL=1680704763649-CreateTransactionEntity.js.map
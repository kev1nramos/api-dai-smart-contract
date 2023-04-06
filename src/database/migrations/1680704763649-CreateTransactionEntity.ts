import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTransactionEntity1680704763649 implements MigrationInterface {
    name = 'CreateTransactionEntity1680704763649'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "transaction" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "hash" character varying NOT NULL, "block_hash" character varying NOT NULL, "block_number" integer NOT NULL, "balance_address_from" character varying NOT NULL, "from" character varying NOT NULL, "balance_address_to" character varying NOT NULL, "to" character varying NOT NULL, "value" character varying NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_89eadb93a89810556e1cbcd6ab9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_290df3897fac99713afb5f3d7a" ON "transaction" ("from") `);
        await queryRunner.query(`CREATE INDEX "IDX_1713783ebe978fa2ae9654e4bb" ON "transaction" ("to") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_1713783ebe978fa2ae9654e4bb"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_290df3897fac99713afb5f3d7a"`);
        await queryRunner.query(`DROP TABLE "transaction"`);
    }

}

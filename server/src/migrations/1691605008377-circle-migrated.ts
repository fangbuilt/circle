import { MigrationInterface, QueryRunner } from "typeorm";

export class CircleMigrated1691605008377 implements MigrationInterface {
    name = 'CircleMigrated1691605008377'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_d8d74bcfa3ef439fa3742445e28"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_eb3609f0fc759438407d71117a2"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "created_by"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "updated_by"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "posted_at"`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "thread_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "user_id" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_a6cc1a07ec07e376947ed1016a0" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_1af58ca9000874da2171004d164" FOREIGN KEY ("thread_id") REFERENCES "threads"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "replies" ADD CONSTRAINT "FK_c961efa3687d100ed22cd409534" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_c961efa3687d100ed22cd409534"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP CONSTRAINT "FK_1af58ca9000874da2171004d164"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP CONSTRAINT "FK_a6cc1a07ec07e376947ed1016a0"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "replies" DROP COLUMN "thread_id"`);
        await queryRunner.query(`ALTER TABLE "threads" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "replies" ADD "posted_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "updated_by" integer`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "created_by" integer`);
        await queryRunner.query(`ALTER TABLE "threads" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_eb3609f0fc759438407d71117a2" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "threads" ADD CONSTRAINT "FK_d8d74bcfa3ef439fa3742445e28" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

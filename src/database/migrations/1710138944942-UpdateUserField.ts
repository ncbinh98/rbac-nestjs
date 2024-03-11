import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserField1710138944942 implements MigrationInterface {
    name = 'UpdateUserField1710138944942'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`age\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`age\``);
    }

}

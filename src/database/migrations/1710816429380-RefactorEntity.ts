import { MigrationInterface, QueryRunner } from 'typeorm';

export class RefactorEntity1710816429380 implements MigrationInterface {
	name = 'RefactorEntity1710816429380';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`story\` ADD \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`,
		);
		await queryRunner.query(
			`ALTER TABLE \`story\` ADD \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`,
		);
		await queryRunner.query(
			`ALTER TABLE \`story\` ADD \`deletedAt\` datetime(6) NULL`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE \`story\` DROP COLUMN \`deletedAt\``);
		await queryRunner.query(`ALTER TABLE \`story\` DROP COLUMN \`updatedAt\``);
		await queryRunner.query(`ALTER TABLE \`story\` DROP COLUMN \`createdAt\``);
	}
}

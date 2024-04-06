import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRetrictFieldInheritance1710233479822
	implements MigrationInterface
{
	name = 'UpdateRetrictFieldInheritance1710233479822';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`role\` ADD \`inheritanceId\` varchar(36) NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`role\` ADD UNIQUE INDEX \`IDX_d1bd5a9eee2138397ffcef66d5\` (\`inheritanceId\`)`,
		);
		await queryRunner.query(
			`CREATE UNIQUE INDEX \`REL_d1bd5a9eee2138397ffcef66d5\` ON \`role\` (\`inheritanceId\`)`,
		);
		await queryRunner.query(
			`ALTER TABLE \`role\` ADD CONSTRAINT \`FK_d1bd5a9eee2138397ffcef66d57\` FOREIGN KEY (\`inheritanceId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`role\` DROP FOREIGN KEY \`FK_d1bd5a9eee2138397ffcef66d57\``,
		);
		await queryRunner.query(
			`DROP INDEX \`REL_d1bd5a9eee2138397ffcef66d5\` ON \`role\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`role\` DROP INDEX \`IDX_d1bd5a9eee2138397ffcef66d5\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`role\` DROP COLUMN \`inheritanceId\``,
		);
	}
}

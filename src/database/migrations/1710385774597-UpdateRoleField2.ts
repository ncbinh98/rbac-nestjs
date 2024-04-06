import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRoleField21710385774597 implements MigrationInterface {
	name = 'UpdateRoleField21710385774597';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`role\` ADD CONSTRAINT \`FK_d1bd5a9eee2138397ffcef66d57\` FOREIGN KEY (\`inheritanceId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`role\` DROP FOREIGN KEY \`FK_d1bd5a9eee2138397ffcef66d57\``,
		);
	}
}

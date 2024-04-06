import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCASLDatabase1710208294639 implements MigrationInterface {
	name = 'UpdateCASLDatabase1710208294639';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`CREATE TABLE \`permission\` (\`id\` varchar(36) NOT NULL, \`action\` varchar(255) NOT NULL, \`subject\` varchar(255) NOT NULL, \`inverted\` tinyint NULL, \`conditions\` text NULL, \`reason\` varchar(255) NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`roleId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`role\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NOT NULL, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`CREATE TABLE \`story\` (\`id\` varchar(36) NOT NULL, \`name\` varchar(255) NULL, \`createdUserId\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` ADD \`roleId\` varchar(36) NULL`,
		);
		await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
		await queryRunner.query(
			`ALTER TABLE \`user\` ADD \`name\` varchar(255) NULL`,
		);
		await queryRunner.query(
			`ALTER TABLE \`permission\` ADD CONSTRAINT \`FK_cdb4db95384a1cf7a837c4c683e\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`story\` ADD CONSTRAINT \`FK_4b825ecf4fb20b4ccf503157d70\` FOREIGN KEY (\`createdUserId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
		await queryRunner.query(
			`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_c28e52f758e7bbc53828db92194\` FOREIGN KEY (\`roleId\`) REFERENCES \`role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_c28e52f758e7bbc53828db92194\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`story\` DROP FOREIGN KEY \`FK_4b825ecf4fb20b4ccf503157d70\``,
		);
		await queryRunner.query(
			`ALTER TABLE \`permission\` DROP FOREIGN KEY \`FK_cdb4db95384a1cf7a837c4c683e\``,
		);
		await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`name\``);
		await queryRunner.query(
			`ALTER TABLE \`user\` ADD \`name\` varchar(500) NOT NULL`,
		);
		await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`roleId\``);
		await queryRunner.query(`DROP TABLE \`story\``);
		await queryRunner.query(`DROP TABLE \`role\``);
		await queryRunner.query(`DROP TABLE \`permission\``);
	}
}

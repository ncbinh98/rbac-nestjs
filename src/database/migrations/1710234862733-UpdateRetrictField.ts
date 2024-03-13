import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateRetrictField1710234862733 implements MigrationInterface {
  name = 'UpdateRetrictField1710234862733';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`permission\` ADD \`fields\` text NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`permission\` DROP COLUMN \`fields\``,
    );
  }
}

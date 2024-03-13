import { MigrationInterface, QueryRunner } from 'typeorm';
import { v5 as uuidv5 } from 'uuid';

export class SeedDataCASL1710208615914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const adminRoleId = uuidv5('Admin', process.env.UUID_NAMESPACE);
    const userRoleId = uuidv5('User', process.env.UUID_NAMESPACE);
    await queryRunner.query(
      `INSERT INTO role (id, name) VALUES ('${adminRoleId}', 'Admin'),('${userRoleId}', 'User');`,
    );

    await queryRunner.query(
      `INSERT INTO permission (id, roleId, action, subject, conditions)VALUES ('${uuidv5('manage_all', process.env.UUID_NAMESPACE)}' ,'${adminRoleId}', 'manage', 'all', NULL),('${uuidv5('read_story', process.env.UUID_NAMESPACE)}','${userRoleId}', 'read', 'Story', NULL),('${uuidv5('manage_story', process.env.UUID_NAMESPACE)}','${userRoleId}', 'manage', 'Story', '{"createdUserId": "{{ id }}" }');`,
    );

    await queryRunner.query(
      `INSERT INTO user (id, username, password, roleId) VALUES ('${uuidv5('user_admin', process.env.UUID_NAMESPACE)}','admin01', '$2b$10$dXcxOz1cyqku.jey5FjMUOvSFU6Ck4QJ76L8se8ecFBRex1z5eU.C', '${adminRoleId}'),('${uuidv5('user_user', process.env.UUID_NAMESPACE)}','user01', '$2b$10$dXcxOz1cyqku.jey5FjMUOvSFU6Ck4QJ76L8se8ecFBRex1z5eU.C', '${userRoleId}')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}

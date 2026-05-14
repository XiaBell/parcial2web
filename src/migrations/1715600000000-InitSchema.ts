import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitSchema1715600000000 implements MigrationInterface {
  name = 'InitSchema1715600000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await queryRunner.query(`
      CREATE TABLE "roles" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "role_name" varchar NOT NULL,
        "description" varchar,
        CONSTRAINT "UQ_roles_role_name" UNIQUE ("role_name")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "users" (
        "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
        "email" varchar NOT NULL,
        "password" varchar NOT NULL,
        "name" varchar NOT NULL,
        "phone" varchar,
        "is_active" boolean NOT NULL DEFAULT true,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_users_email" UNIQUE ("email")
      );
    `);

    await queryRunner.query(`
      CREATE TABLE "users_roles" (
        "user_id" uuid NOT NULL,
        "role_id" uuid NOT NULL,
        CONSTRAINT "PK_users_roles" PRIMARY KEY ("user_id", "role_id"),
        CONSTRAINT "FK_users_roles_user"
          FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
        CONSTRAINT "FK_users_roles_role"
          FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE CASCADE
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users_roles";`);
    await queryRunner.query(`DROP TABLE "users";`);
    await queryRunner.query(`DROP TABLE "roles";`);
  }
}

import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateUsers1648636802622 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('create extension if not exists "uuid-ossp"')
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()'
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'role',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'access_token',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'reset_password_token',
            type: 'varchar',
            isNullable: true
          },
          {
            name: 'reset_password_token_expires_at',
            type: 'timestamp',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'deleted_at',
            type: 'timestamp',
            isNullable: true

          }
        ]
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users')
  }
}

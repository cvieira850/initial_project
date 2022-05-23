import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm'
import bcrypt from 'bcrypt'

export class CreateUsers1648636802622 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<void> {
    const password = await bcrypt.hash('admin', 12)

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
            name: 'role_id',
            type: 'uuid',
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
    await queryRunner.createForeignKey(
      'users',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        name: 'RoleUser',
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      })
    )

    await queryRunner.query(
      `INSERT INTO USERS(email,name,role_id, password)
        values
        (
          'contato@caiovieira.com.br',
          'Caio Vieira',
          (
            select id from roles where name='sysAdmin'
          ),
          '${password}'
        )
      `
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('users', 'RoleUser')
    await queryRunner.dropTable('users')
  }
}

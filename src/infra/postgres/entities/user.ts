import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  name!: string

  @Column()
  email!: string

  @Column()
  password!: string

  @Column()
  role!: string

  @Column({ nullable: true })
  access_token?: string

  @Column({ nullable: true })
  reset_password_token?: string

  @Column({ nullable: true })
  reset_password_token_expires_at?: Date

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn({ nullable: true })
  updated_at!: Date

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date
}

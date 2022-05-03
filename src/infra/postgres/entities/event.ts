import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'

@Entity({ name: 'events' })
export class Event {
  @PrimaryGeneratedColumn()
  id!: string

  @Column()
  name!: string

  @Column()
  description!: string

  @Column()
  user_id!: string

  @CreateDateColumn()
  created_at!: Date

  @UpdateDateColumn({ nullable: true })
  updated_at!: Date

  @DeleteDateColumn({ nullable: true })
  deleted_at!: Date
}

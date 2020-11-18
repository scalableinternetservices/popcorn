import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Room as RoomType } from '../graphql/schema.types'
import { MovieUser } from './MovieUser'

@Entity()
export class Room extends BaseEntity implements RoomType {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @OneToOne(() => MovieUser)
  @JoinColumn()
  admin_user_id: number

  @Column()
  room_id: number

  @Column({
    nullable: true,
  })
  genre1: string

  @Column({
    nullable: true,
  })
  genre2: string
}

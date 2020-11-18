import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Vote as VoteType } from '../graphql/schema.types'
//import { Movie } from './Movies'
//import { Room } from './Rooms'
//import { User } from './User'

@Entity()
export class Vote extends BaseEntity implements VoteType {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  //@ManyToOne(() => Room)
  @Column()
  room_id: number

  //@ManyToOne(() => Movie)
  @Column({
    nullable: true,
  })
  movie_id: number

  //@ManyToOne(() => User)
  @Column({
    nullable: true,
  })
  user_id: number
}

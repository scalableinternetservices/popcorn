import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Vote as VoteType } from '../graphql/schema.types'
//import { Movie } from './Movies'
//import { Room } from './Rooms'
//import { User } from './User'

@Entity()
export class Vote extends BaseEntity implements VoteType {
  __typename?: 'Vote' | undefined
  movie_id: number
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
  movie_title: string

  //@ManyToOne(() => User)
  @Column({
    nullable: true,
  })
  user_id: number
}

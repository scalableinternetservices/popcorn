import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Vote as VoteType } from '../graphql/schema.types'
import { Movie } from './Movies'
import { MovieUser } from './MovieUser'
import { Room } from './Rooms'

@Entity()
export class Vote extends BaseEntity implements VoteType {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @ManyToOne(() => Room)
  @JoinColumn()
  room_id: number

  @ManyToOne(() => Movie)
  @Column({
    nullable: true,
  })
  movie_id: number

  @ManyToOne(() => MovieUser)
  @Column({
    nullable: true,
  })
  user_id: number
}

import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Vote as VoteType } from '../graphql/schema.types'
import { Movie } from './Movies'
import { Room } from './Rooms'
import { User } from './User'

@Entity()
export class Votes extends BaseEntity implements VoteType {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @OneToOne(() => Room)
  @JoinColumn()
  room_id: number

  @ManyToOne(() => Movie)
  @Column({
    nullable: true,
  })
  movie_id: number

  @ManyToOne(() => User)
  @Column({
    nullable: true,
  })
  user_id: number

}
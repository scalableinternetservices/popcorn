import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Vote as VoteType } from '../graphql/schema.types'

@Entity()
export class Votes extends BaseEntity implements VoteType {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @Column({
    nullable: true,
  })
  room_id: number

  @Column({
    nullable: true,
  })
  movie_id: number

  @Column({
    nullable: true,
  })
  num_votes: number

}
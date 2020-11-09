import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RoomMovieCollection as RoomMovieCollectionType } from '../graphql/schema.types'
import { Movie } from './Movies'
import { Room } from './Rooms'

@Entity()
export class RoomMovieCollection extends BaseEntity implements RoomMovieCollectionType {

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @ManyToOne(() => Room)
  @JoinColumn()
  room_id: number

  @ManyToOne(() => Movie)
  @JoinColumn()
  movie_id: number

  @Column({
    nullable: true,
  })
  index: number


}
import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { RoomMovieCollection as RoomMovieCollectionType } from '../graphql/schema.types'
import { Movie } from './Movies'

@Entity()
export class RoomMovieCollection extends BaseEntity implements RoomMovieCollectionType {
  room_id: number
  movie_id: number
  __typename?: 'RoomMovieCollection' | undefined

  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  //@ManyToOne(() => Room)
  @Column()
  m_room_id: number

  @ManyToOne(() => Movie)
  @Column()
  m_movie_id: number

  @Column({
    nullable: true,
  })
  movie_index: number


}
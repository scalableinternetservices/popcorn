import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { Movie as MovieType } from '../graphql/schema.types'

@Entity()
export class Movie extends BaseEntity implements MovieType {
  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @PrimaryColumn()
  movie_id: number

  @Column({
    length: 100,
    nullable: true,
  })
  title: string

  @Column({
    nullable: true,
  })
  time: number

  @Column({
    nullable: true,
  })
  year: number

  @Column({
    length: 100,
    nullable: true,
  })
  genre: string

  @Column({
    length: 100,
    nullable: true,
  })
  director: string

  @Column({
    length: 100,
    nullable: true,
  })
  actors: string

  @Column({
    length: 100,
    nullable: true,
  })
  country: string

  @Column({
    nullable: true,
  })
  rating: number

  @Column({
    nullable: true,
  })
  netflix: string

  @Column({
    length: 100,
    nullable: true,
  })
  enter_in: string

  @Column({
    length: 100,
    nullable: true,
  })
  image: string

  @Column({
    nullable: true,
  })
  description: string
}

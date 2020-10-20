import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { Movie as MovieType } from '../graphql/schema.types'

@Entity()
export class Movie extends BaseEntity implements MovieType {
  genre: string
  title: string
  description: string
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column({
    length: 100,
    nullable: true,
  })
  name: string

  @Column({
    length: 100,
    nullable: true,
  })
  genres: string

  @Column({
    length: 100,
    nullable: true,
  })
  maturity: string

  @Column({
    nullable: true,
  })
  length: number

  @Column({
    length: 100,
    nullable: true,
  })
  image: string

  @Column({
    length: 100,
    nullable: true,
  })
  director: string

  @Column({
    length: 100,
    nullable: true,
  })
  cast: string

  @Column({
    nullable: true,
  })
  languages: string

  @Column({
    nullable: true,
  })
  year: number
}

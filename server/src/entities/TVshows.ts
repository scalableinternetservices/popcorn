import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { TVshow as TVshowType } from '../graphql/schema.types'


@Entity()
export class TVshow extends BaseEntity implements TVshowType {
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
    nullable: true
  })
  name: string

  @Column({
    length: 100,
    nullable: true
  })
  genres: string

  @Column({
    length: 100,
    nullable: true
  })
  maturity: string

  @Column({
    length: 100,
    nullable: true
  })
  seasons: number

  @Column({
    length: 100,
    nullable: true
  })
  image: string

  @Column({
    length: 100,
    nullable: true
  })
  director: string

  @Column({
    length: 100,
    nullable: true
  })
  cast: string[]

  @Column({
    length: 100,
    nullable: true
  })
  languages: string[]

  @Column({
    length: 100,
    nullable: true
  })
  year: number


}

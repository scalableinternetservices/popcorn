import { BaseEntity, Column, CreateDateColumn, Entity, Index, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm'
import { Genres as GenresType } from '../graphql/schema.types'
import { Movie } from './Movies'

@Entity()
export class Genres extends BaseEntity implements GenresType {

  @CreateDateColumn()
  timeCreated: Date

  @Index()
  @OneToOne(() => Movie)
  @JoinColumn()
  @PrimaryColumn()
  movie_id: number

  @Column({
    default: false
  })
  action_and_adventure: boolean

  @Column({
    default: false
  })
  anime_features: boolean

  @Column({
    default: false
  })
  children_family_movies: boolean

  @Column({
    default: false
  })
  classic_movies: boolean

  @Column({
    default: false
  })
  comedies: boolean

  @Column({
    default: false
  })
  cult_movies: boolean

  @Column({
    default: false
  })
  documentaries: boolean

  @Column({
    default: false
  })
  dramas: boolean

  @Column({
    default: false
  })
  faith_and_Spirituality: boolean

  @Column({
    default: false
  })
  horror_movies: boolean

  @Column({
    default: false
  })
  independent_movies: boolean

  @Column({
    default: false
  })
  international_movies: boolean

  @Column({
    default: false
  })
  lgbtq_movies: boolean

  @Column({
    default: false
  })
  movies: boolean

  @Column({
    default: false
  })
  music_and_musicals: boolean

  @Column({
    default: false
  })
  romantic_movies: boolean

  @Column({
    default: false
  })
  scifi_and_fantasy: boolean

  @Column({
    default: false
  })
  sports_movies: boolean

  @Column({
    default: false
  })
  standup_comedy: boolean

  @Column({
    default: false
  })
  thrillers: boolean

}

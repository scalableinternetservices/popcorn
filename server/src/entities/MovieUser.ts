import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,

  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { MovieUser as GraphqlUser } from '../graphql/schema.types'

@Entity()
export class MovieUser extends BaseEntity implements GraphqlUser {
  __typename?: 'MovieUser' | undefined
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @Column()
  room_id: number

  @Column({
    nullable: true,
  })
  u_id: number

  @Column({
    length: 100,
    nullable: true,
  })
  name: string
}

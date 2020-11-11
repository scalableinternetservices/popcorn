import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { MovieUser as GraphqlUser } from '../graphql/schema.types'
import { Room } from './Rooms'

@Entity()
export class MovieUser extends BaseEntity implements GraphqlUser {
  __typename?: 'MovieUser' | undefined
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn()
  timeCreated: Date

  @UpdateDateColumn()
  timeUpdated: Date

  @OneToOne(() => Room)
  @Column({
    nullable: true,
  })
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

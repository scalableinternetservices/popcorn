import { gql } from '@apollo/client'

export const fragmentUsersInRoom = gql`
  fragment User on User {
    name
  }
`

export const fetchUsersInRoom = gql`
  query FetchUsersInRoom($room_id: Int!) {
    usersInRoom(room_id: $room_id) {
      ...User
    }
  }
  ${fragmentUsersInRoom}
`

import { gql } from '@apollo/client'

export const fragmentRoom = gql`
  fragment Room on Room {
    room_id
    admin_user_id
    genre1
    genre2
  }
`

export const fetchRooms = gql`
  query FetchRooms {
    rooms {
      ...Room
    }
  }
  ${fragmentRoom}
`

export const fetchRoom = gql`
  query FetchRoom($room_id: Int!) {
    room(room_id: $room_id) {
      ...Room
    }
  }
  ${fragmentRoom}
`

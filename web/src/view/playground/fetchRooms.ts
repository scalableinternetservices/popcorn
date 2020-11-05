import { gql } from '@apollo/client'

export const fragmentRoom = gql`
  fragment Room on Room {
    room_id
    user_admin_id
    genre1
    genre2
  }
`

export const fetchSurveys = gql`
  query FetchRoom {
    rooms {
      ...Room
    }
  }
  ${fragmentRoom}
`

export const fetchSurvey = gql`
  query FetchRoom($room_id: Int!) {
    room(roomId: $room_id) {
      ...Room
    }
  }
  ${fragmentRoom}
`

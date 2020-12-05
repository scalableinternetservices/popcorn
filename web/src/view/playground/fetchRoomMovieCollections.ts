import { gql } from '@apollo/client'

export const fragmentRoomMovieCollection = gql`
  fragment RoomMovieCollection on RoomMovieCollection {
    m_movie_id
  }
`

export const fetchRoomMovieCollection = gql`
  query FetchRoomMovieCollection($room_id: Int!) {
    roomMovieCollection(room_id: $room_id) {
      ...RoomMovieCollection
    }
  }
  ${fragmentRoomMovieCollection}
`

import { gql } from '@apollo/client'

export const fragmentNextMovie = gql`
  fragment RoomMovieCollection on RoomMovieCollection {
    m_movie_id
  }
`
export const fetchNextMovie = gql`
  query FetchNextMovie($room_id: Int!, $index: Int!) {
    nextMovie(roomId: $room_id, curIndex: $index) {
      ...RoomMovieCollection
    }
  }
  ${fragmentNextMovie}
`

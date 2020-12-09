import { gql } from '@apollo/client'

export const fragmentMovieUser = gql`
  fragment MovieUser on MovieUser {
    room_id
  }
`

export const fetchMovieUser = gql`
  query FetchMovieUser($id: Int!) {
    movieUser(uid: $id) {
      ...MovieUser
    }
  }
  ${fragmentMovieUser}
`

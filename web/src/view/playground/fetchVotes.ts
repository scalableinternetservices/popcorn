import { gql } from '@apollo/client'

export const fragmentVote = gql`
  fragment Vote on Vote {
    room_id
  }
`

export const fetchVotes = gql`
  query FetchVotes($room_id: Int!, $movie_title: String!) {
    votes(roomId: $room_id, movieTitle: $movie_title) {
      ...Vote
    }
  }
  ${fragmentVote}
`

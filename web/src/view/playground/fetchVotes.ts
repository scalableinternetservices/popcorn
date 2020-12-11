import { gql } from '@apollo/client'

export const fragmentVote = gql`
  fragment Vote on Vote {
    movie_title
  }
`

export const fetchVotes = gql`
  query FetchVotes($room_id: Int!) {
    votes(roomId: $room_id) {
      ...Vote
    }
  }
  ${fragmentVote}
`

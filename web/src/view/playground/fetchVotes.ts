import { gql } from '@apollo/client'

export const fragmentVote = gql`
  fragment Vote on Vote {
    movie_id
  }
`

export const fetchVotes = gql`
  query FetchVotes {
    votes(roomId: 1) {
      ...Vote
    }
  }
  ${fragmentVote}
`

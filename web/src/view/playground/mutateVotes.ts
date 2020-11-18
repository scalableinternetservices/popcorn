import { ApolloClient, gql } from '@apollo/client'
//import { getApolloClient } from '../../graphql/apolloClient'
import { AddVote, AddVoteVariables, VoteInput } from '../../graphql/query.gen'
//import { fragmentSurvey, fragmentSurveyQuestion } from './fetchSurveys'

const addVoteMutation = gql`
  mutation AddVote($input: VoteInput!) {
    addVote(input: $input)
  }
`

export function addVote(client: ApolloClient<any>, input: VoteInput) {
  return client.mutate<AddVote, AddVoteVariables>({
    mutation: addVoteMutation,
    variables: { input },
  })
}

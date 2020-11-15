
import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { AddMovieUser, AddMovieUserVariables, MovieUserInput } from '../../graphql/query.gen'


const addMovieUserMutation = gql`
  mutation AddMovieUser($input: MovieUserInput!) {
    addMovieUser(input: $input)
  }
`

export function addMovieUser(client: ApolloClient<any>, input: MovieUserInput) {
  return getApolloClient().mutate<AddMovieUser, AddMovieUserVariables>({
    mutation: addMovieUserMutation,
    variables: { input },
  })
}

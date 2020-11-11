import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { AddRoomAndMovieUser, AddRoomAndMovieUserVariables, RoomAndMovieUserInput } from '../../graphql/query.gen'

const addRoomAndMovieUserMutation = gql`
  mutation AddRoomAndMovieUser($input: RoomAndMovieUserInput!) {
    addRoomAndMovieUser(input: $input)
  }
`

export function addRoomAndMovieUser(client: ApolloClient<any>, input: RoomAndMovieUserInput) {
  return getApolloClient().mutate<AddRoomAndMovieUser, AddRoomAndMovieUserVariables>({
    mutation: addRoomAndMovieUserMutation,
    variables: { input },
  })
}

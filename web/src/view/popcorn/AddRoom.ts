import { ApolloClient, gql } from '@apollo/client'
import { getApolloClient } from '../../graphql/apolloClient'
import { AddRoom, AddRoomVariables, RoomInput } from '../../graphql/query.gen'

const addRoomMutation = gql`
  mutation AddRoom($input: RoomInput!) {
    addRoom(input: $input)
  }
`

export function addRoom(client: ApolloClient<any>, input: RoomInput) {
  return getApolloClient().mutate<AddRoom, AddRoomVariables>({
    mutation: addRoomMutation,
    variables: { input },
  })
}
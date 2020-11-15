import { gql } from '@apollo/client'

export const fetchUser = gql`
  query FetchUserContext {
    self {
      id
      name
      room_id
      userType
    }
  }
`

import { gql } from '@apollo/client'

export const fragmentMovie = gql`
  fragment Movie on Movie {
    movie_id
    title
  }
`

export const fetchMovies = gql`
  query FetchMovie {
    movies {
      ...Movie
    }
  }
  ${fragmentMovie}
`

export const fetchMovie = gql`
  query FetchMovie($movie_id: Int!) {
    movie(roomId: $movie_id) {
      ...Movie
    }
  }
  ${fragmentMovie}
`
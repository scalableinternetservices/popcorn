import { useQuery } from '@apollo/client';
import React from 'react';
import { FetchMovies } from '../../graphql/query.gen';
import { fetchMovies } from './fetchMovies';


//OLD THINKING: NOT RELEVANT
// export function getMovie() {
//   const { loading, data } = useQuery<FetchRoomMovieCollection>(fetchRoomMovieCollection, { variables: { room_id: 1 } })
//   if (loading) {
//     return <div>loading...</div>
//   }
//   if (!data) {
//     return <div>no movies</div>
//   }
//   if (!data.roomMovieCollection) return <div>null movies</div>

//   const movie_title = useQuery<FetchMovies>(fetchMovies, { variables: { movie_id: data.roomMovieCollection.movie_id } })

//   return movie_title
// }

export function showMovie() //need variable for room_id and current movie_id
{
  //need to add mutateMovie for nextMovie?
  const next_id: nextMovie(1, 1) //hardcoding room ID: 1, hardcoding movie index 1
  const { loading, data } = useQuery<FetchMovies>(fetchMovies, { variables: { movie_id: next_id } })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data) {
    return <div>no movie</div>
  }
  return data.movies
}

export function addYesVotes()  //need variable for movie_id because it won't always be 1
{
  const next_id: nextMovie(1, 1) //harcoding room ID: 1, first movie index: 1
  const { loading, data } = useQuery<FetchMovies>(fetchMovies, { variables: { movie_id: next_id } })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data) {
    return <div>no movie</div>
  }

  //add mutate votes
}

//do not need to do anything for no votes

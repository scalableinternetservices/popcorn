//import { fetchRoomMovieCollection } from '../playground/fetchRoomMovieCollections'
//import { FetchRoomMovieCollection } from '../../graphql/query.gen'
import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { FetchMovie, FetchNextMovie } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'
import { fetchMovie } from '../playground/fetchMovies'
import { fetchNextMovie } from '../playground/fetchNextMovie'

interface SwipePageProps extends RouteComponentProps, AppRouteParams {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SwipePage(props: SwipePageProps) {
  const [count, setCount] = useState(1)
  /*let currentIndex = 0
  const swipes = 10
  const { user } = React.useContext(UserContext)
  if (!user || user.room_id == null) {
    return <div>no room</div>
  }
  const { loading, data } = useQuery<FetchRoomMovieCollection>(fetchRoomMovieCollection, {
    variables: { room_id: user.room_id },
  })
  if (loading || !data) {
    return <div>loading</div>
  }
  const movieList = data.roomMovieCollection
  if (!movieList) {
    return <div>null</div>
  }
  movieList.forEach( mov =>
  */
  console.log(count)
  return (
    <Page>
      <div
        style={{
          padding: '20px',
          fontSize: '30px',
          border: 'black',
          borderStyle: 'double',
          margin: '10px',
          fontWeight: 'lighter',
        }}
      >
        Movie: {getMovie(count)}
      </div>
      <span style={{ padding: '12px', fontSize: '30px', border: 'black', borderStyle: 'double', marginLeft: '240px' }}>
        <Button
          onClick={() => {
            setCount(count + 1)
            //console.log(count)
            //movieTitle = getMovie(count)
            window.location.replace('/app/popcorn/swipe')
          }}
        >
          {' '}
          No{' '}
        </Button>
      </span>
      <span style={{ padding: '12px', fontSize: '30px', border: 'black', borderStyle: 'double', marginLeft: '120px' }}>
        <Button
          onClick={() => {
            setCount(count + 1)
            //console.log(count)
            //movieTitle = getMovie(count)
            window.location.replace('/app/popcorn/swipe')
          }}
        >
          {' '}
          Yes{' '}
        </Button>
      </span>
    </Page>
  )
}

function getMovie(cur_index: number) {
  const { user } = React.useContext(UserContext)
  if (!user || user.room_id == null) {
    return <div>no room</div>
  }
  const { loading, data } = useQuery<FetchNextMovie>(fetchNextMovie, {
    variables: { room_id: user.room_id, index: cur_index },
  })
  if (loading || !data) {
    return <div>loading</div>
  }
  const currentMovie = data.nextMovie
  if (!currentMovie || currentMovie.m_movie_id == null) {
    return <div>no</div>
  }
  return getMovieTitle(currentMovie.m_movie_id)
}

function getMovieTitle(movie_id: number) {
  const { loading, data } = useQuery<FetchMovie>(fetchMovie, {
    variables: { movie_id: movie_id },
  })
  if (loading || !data) {
    return null
  }
  const mov = data.movie
  if (!mov) {
    return null
  }
  return mov.title
}

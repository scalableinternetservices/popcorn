//import { fetchRoomMovieCollection } from '../playground/fetchRoomMovieCollections'
//import { FetchRoomMovieCollection } from '../../graphql/query.gen'
import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { FetchMovie, FetchNextMovie } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'
import { fetchMovie } from '../playground/fetchMovies'
import { fetchNextMovie } from '../playground/fetchNextMovie'
import { addVote } from '../playground/mutateVotes'
import { handleError } from '../toast/error'

interface SwipePageProps extends RouteComponentProps, AppRouteParams {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SwipePage(props: SwipePageProps) {
  const [count, setCount] = useState(1)
  const { user } = React.useContext(UserContext)
  const movieId = getMovieId(count)
  const movieTitle = getMovieTitle(movieId)

  function doAddVote() {
    console.log('voting')
    if (user != null && user.id != null && user.room_id != null && movieId != null)
      addVote(getApolloClient(), { room_id: user.room_id, movie_id: movieId, user_id: user?.id }).catch(handleError)
  }
  console.log(count)
  //addMovieVote(1)
  return (
    <Page>
      <div
        style={{
          padding: '20px',
          fontSize: '30px',
          margin: '10px',
          fontWeight: 'lighter',
        }}
      >
        Movie: {movieTitle}
      </div>
      <div>
        <img
          style={{ marginLeft: '88px', marginBottom: '60px' }}
          src={'/app/assets/' + movieTitle?.replace('#', '') + '.jpg'}
        />
      </div>
      <span style={{ padding: '12px', fontSize: '30px' }}>
        <Button
          onClick={async () => {
            doAddVote()
            console.log('voted')
            setCount(count + 1)
          }}
        >
          Yes
        </Button>
      </span>
      <span style={{ padding: '12px', fontSize: '30px', marginLeft: '480px' }}>
        <Button
          onClick={() => {
            setCount(count + 1)
            //console.log(count)
            //movieTitle = getMovie(count)
            //window.location.replace('/app/popcorn/swipe')
          }}
        >
          {' '}
          No{' '}
        </Button>
      </span>
      <div style={{ padding: '12px', fontSize: '30px', marginLeft: '180px', marginTop: '50px', marginBottom: '200px' }}>
        <Button
          onClick={() => {
            window.location.replace('/app/popcorn/results')
          }}
        >
          {' '}
          Finish and See Results{' '}
        </Button>
      </div>
    </Page>
  )
}

function getMovieId(cur_index: number) {
  const { user } = React.useContext(UserContext)
  if (!user || user.room_id == null) {
    return -1
  }
  const { loading, data } = useQuery<FetchNextMovie>(fetchNextMovie, {
    variables: { room_id: user.room_id, index: cur_index },
  })
  if (loading || !data) {
    return -1
  }
  const currentMovie = data.nextMovie
  if (!currentMovie || currentMovie.m_movie_id == null) {
    return -1
  }
  return currentMovie.m_movie_id
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

//import { fetchRoomMovieCollection } from '../playground/fetchRoomMovieCollections'
//import { FetchRoomMovieCollection } from '../../graphql/query.gen'
import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { getApolloClient } from '../../graphql/apolloClient'
import { FetchMovie, FetchNextMovie, FetchRoom } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'
import { fetchMovie } from '../playground/fetchMovies'
import { fetchNextMovie } from '../playground/fetchNextMovie'
import { fetchRoom } from '../playground/fetchRooms'
import { addVote } from '../playground/mutateVotes'
import { handleError } from '../toast/error'

interface SwipePageProps extends RouteComponentProps, AppRouteParams {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SwipePage(props: SwipePageProps) {
  const [count, setCount] = useState(1)
  const { user } = React.useContext(UserContext)
  const movieId = getMovieId(count)
  const mov = getMovie(movieId)
  const { loading, data } = useQuery<FetchRoom>(fetchRoom, { variables: { room_id: user?.room_id } })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data || !data.room) {
    return <div>no votes</div>
  }
  const total_swipes = data.room.max_swipes
  console.log('TOTAL SWIPES')
  console.log(total_swipes)

  function doAddVote() {
    console.log('voting')
    if (user != null && user.id != null && user.room_id != null && mov != null)
      addVote(getApolloClient(), { room_id: user.room_id, movie_title: mov.title, user_id: user?.id }).catch(
        handleError
      )
  }
  console.log(count)
  //addMovieVote(1)

  return (
    <Page>
      <div
        style={{
          padding: '5px',
          fontSize: '20px',
          fontWeight: 'normal',
        }}
      >
        Title: <span style={{ fontWeight: 'lighter' }}>{mov?.title}</span>
      </div>
      <div
        style={{
          padding: '5px',
          fontSize: '20px',
          fontWeight: 'normal',
        }}
      >
        Rating: <span style={{ fontWeight: 'lighter' }}>{mov?.rating}</span>
      </div>
      <div
        style={{
          padding: '5px',
          fontSize: '20px',
          fontWeight: 'normal',
        }}
      >
        Director: <span style={{ fontWeight: 'lighter' }}> {mov?.director}</span>
      </div>
      <div
        style={{
          padding: '5px',
          fontSize: '20px',
          fontWeight: 'normal',
        }}
      >
        Actors: <span style={{ fontWeight: 'lighter' }}> {mov?.actors}</span>
      </div>
      <div
        style={{
          padding: '5px',
          fontSize: '20px',
          fontWeight: 'normal',
        }}
      >
        Year: <span style={{ fontWeight: 'lighter' }}>{mov?.year}</span>
      </div>
      <div style={{ display: 'inline-block' }}>
        <span style={{ padding: '12px', fontSize: '30px', fontWeight: 'lighter', float: 'left', marginTop: '150px' }}>
          <Button
            onClick={() => {
              setCount(count + 1)
              //console.log(count)
              //movieTitle = getMovie(count)
              //window.location.replace('/app/popcorn/swipe')

              if (count >= total_swipes) {
                window.location.replace('/app/popcorn/results')
              }
            }}
          >
            {' '}
            No{' '}
          </Button>
        </span>
        <span>
          <img style={{ marginTop: '30px' }} src={'/app/assets/' + mov?.title?.replace('#', '') + '.jpg'} width="400" />
        </span>
        <span style={{ padding: '12px', fontSize: '30px', fontWeight: 'lighter', float: 'right', marginTop: '150px' }}>
          <Button
            onClick={async () => {
              doAddVote()
              console.log('voted')
              setCount(count + 1)

              if (count >= total_swipes) {
                window.location.replace('/app/popcorn/results')
              }
            }}
          >
            Yes
          </Button>
        </span>
      </div>
      <div
        style={{
          padding: '12px',
          fontSize: '30px',
          marginLeft: '180px',
          marginTop: '40px',
          marginBottom: '200px',
          fontWeight: 'lighter',
        }}
      >
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

function getMovie(movie_id: number) {
  const { loading, data } = useQuery<FetchMovie>(fetchMovie, {
    variables: { movie_id: movie_id },
  })
  if (loading || !data) {
    //window.location.replace('/app/popcorn/results')
    return null
  }
  return data.movie
}

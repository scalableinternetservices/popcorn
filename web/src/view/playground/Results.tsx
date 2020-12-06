import { useQuery } from '@apollo/client'
import * as React from 'react'
import { FetchRoom, FetchRoom_room, FetchVotes } from '../../graphql/query.gen'
import { SmallText } from '../../style/text'
import { UserContext } from '../auth/user'
import { getMovie, getMovieId } from '../popcorn/SwipePage'
import { fetchRoom } from './fetchRooms'
import { fetchVotes } from './fetchVotes'

export function Votes() {
  const { user } = React.useContext(UserContext)
  if (!user || user.room_id == null) {
    return <div>error: no user found</div>
  }
  console.log('test', user.room_id)
  const { loading, data } = useQuery<FetchRoom>(fetchRoom, { variables: { room_id: user.room_id } })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data) {
    return <div>no data</div>
  }
  return <ResultsHistogram room={data.room} />
  /*const { loading, data } = useQuery<FetchVotes>(fetchVotes, {
    variables: { room_id: user.room_id },
    pollInterval: 10000,
  })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data) {
    return <div>no votes</div>
  }
  if (!data.votes) return <div>null votes</div>
  if (data.votes.length === 0) return <div>no length</div>

  return <ResultsHistogram votes={data.votes} />*/
}

function ResultsHistogram({ room }: { room: FetchRoom_room | null }) {
  const swipes = room?.max_swipes
  const cur_room_id = room?.room_id
  if (!swipes || !cur_room_id) {
    return <div>no room</div>
  }
  const pairs: { movie: string; count: number }[] = []
  for (let i = 1; i < swipes + 1; i++) {
    const cur_movie_id = getMovieId(i)
    const cur_movie_title = getMovie(cur_movie_id)?.title
    if (!cur_movie_title) {
      console.log('bad')
    } else {
      console.log('good')
      console.log('current movie:' + cur_movie_title + 'room id: ' + cur_room_id)
      const { data } = useQuery<FetchVotes>(fetchVotes, {
        variables: { room_id: cur_room_id, movie_title: cur_movie_title },
        pollInterval: 10000,
      })
      if (!data?.votes || data.votes.length == 0) {
        //don't add to list
      } else {
        console.log('current movie:' + cur_movie_title + 'number of votes: ')
        pairs.push({ movie: cur_movie_title, count: data.votes.length })
      }
    }
  }
  /*
  const answerBuckets: { [key: string]: number } = {}
  votes.forEach(a => {
    let norm = ''
    if (!a) {
      norm = 'null movie'
    } else {
      norm = a.movie_title
    }
    answerBuckets[norm] = answerBuckets[norm] || 0
    answerBuckets[norm]++
  })

  const pairs: { movie: string; count: number }[] = []
  for (const movie of Object.keys(answerBuckets)) {
    pairs.push({ movie, count: answerBuckets[movie] })
  }*/
  const sorted = pairs.sort((a, b) => b.count - a.count)
  if (sorted.length === 0) {
    return <div>no length</div>
  }

  return (
    <div>
      <div style={{ padding: '20px', fontSize: '50px', border: 'black', margin: '10px', fontWeight: 'lighter' }}>
        <b>Results:</b>
      </div>
      <div className="flex">
        <div>
          {sorted.map((pair, i) => (
            <SmallText key={i} $monospace>
              <SmallText>{pair.movie}</SmallText>
              {new Array(Math.floor(pair.count / 15)).fill(' ').map((str, i) => (
                <SmallText key={i}>{str}</SmallText>
              ))}
            </SmallText>
          ))}
        </div>
        <div>
          {sorted.map((pair, i) => (
            <SmallText key={i} $monospace>
              {new Array(Math.floor(pair.count / 15) + 1).fill(' ║ ').map((str, i) => (
                <SmallText key={i}>{str}</SmallText>
              ))}
            </SmallText>
          ))}
        </div>
        <div style={{ flex: 1 }}>
          {sorted.map((pair, i) => (
            <SmallText key={i} $monospace>
              {new Array(Math.floor(pair.count / 15)).fill(histBar(15)).map((str, i) => (
                <SmallText key={i}>{str}</SmallText>
              ))}
              <SmallText>
                {histBar(pair.count % 15)} {pair.count}
              </SmallText>
            </SmallText>
          ))}
        </div>
      </div>
    </div>
  )
}

function histBar(n: number) {
  return new Array(Math.min(n, 15)).fill('=').join('')
}

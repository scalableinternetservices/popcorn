import { useQuery } from '@apollo/client'
import * as React from 'react'
import { FetchVotes, FetchVotes_votes } from '../../graphql/query.gen'
import { SmallText } from '../../style/text'
import { UserContext } from '../auth/user'
import { fetchVotes } from './fetchVotes'

export function Votes() {
  const { user } = React.useContext(UserContext)
  if (!user || user.room_id == null) {
    return <div>error: no user found</div>
  }
  console.log('test', user.room_id)
  const { loading, data } = useQuery<FetchVotes>(fetchVotes, {
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

  return <ResultsHistogram votes={data.votes} />
}

function ResultsHistogram({ votes }: { votes: (FetchVotes_votes | null)[] }) {
  const answerBuckets: { [key: string]: number } = {}
  votes.forEach(a => {
    let norm = ''
    if (!a) {
      norm = 'null movie'
    } else {
      norm = a.movie_title
      /*const { loading, data } = useQuery<FetchMovie>(fetchMovie, { variables: { movie_id: mId } })
      if (loading) {
        norm = 'loading'
      }
      if (!data) {
        norm = 'null titles'
      } else {
        const mv = data.movie
        if (!mv) {
          norm = 'null title'
        } else {
          norm = mv.title
        }
      }*/
    }
    answerBuckets[norm] = answerBuckets[norm] || 0
    answerBuckets[norm]++
  })

  const pairs: { movie: string; count: number }[] = []
  for (const movie of Object.keys(answerBuckets)) {
    pairs.push({ movie, count: answerBuckets[movie] })
  }
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

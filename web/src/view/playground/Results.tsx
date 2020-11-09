import { useQuery } from '@apollo/client'
import * as React from 'react'
import { strutil } from '../../../../common/src/util'
import { FetchVotes, FetchVotes_votes } from '../../graphql/query.gen'
import { SmallText } from '../../style/text'
import { fetchVotes } from './fetchVotes'

export function Votes() {
  const { loading, data } = useQuery<FetchVotes>(fetchVotes)
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
      norm = a.movie_id.toString()
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
    return null
  }

  return (
    <div className="flex">
      <div style={{ flex: 1 }} className="tr">
        {sorted.map((pair, i) => (
          <SmallText key={i} $monospace>
            <SmallText title={pair.movie} $monospace>
              {strutil.truncate(pair.movie, 17)}
            </SmallText>
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
  )
}

function histBar(n: number) {
  return new Array(Math.min(n, 15)).fill('=').join('')
}

import http from 'k6/http'
import { sleep } from 'k6'
import { Counter, Rate } from 'k6/metrics'

export const options = {
  scenarios: {
    example_scenario: {
      // name of the executor to use
      executor: 'ramping-arrival-rate',
      // common scenario configuration
      startRate: '50',
      timeUnit: '1s',
      // executor-specific configuration
      preAllocatedVUs: 50,
      maxVUs: 100,
      stages: [
        { target: 50, duration: '30s' },
        { target: 0, duration: '30s' },
      ],
    },
  },
}

//another request: {operationName: "AddVote", variables: {input: {room_id: 84200, movie_id: -1, user_id: 2}},…}
///auth/createUser
export default function () {
  //http.get('http://localhost:3000')
  // recordRates(

  // var url = 'http://localhost:3000/auth/createUser'
  // var payload = JSON.stringify({
  //   room_id: '44444',
  //   name: 'test_user',
  // })
  // var params = {
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // }
  // http.post(url, payload, params)

  const resp_createUser = http.post(
    'http://localhost:3000/graphql',
    '{"operationName":"AddRoomAndMovieUser","variables":{"input":{"genre1":"Thrillers","genre2":"Dramas","room_id":44444,"max_swipes":10,"name":"test"}},"query":"mutation AddRoomAndMovieUser($input: RoomAndMovieUserInput!) {\\n  addRoomAndMovieUser(input: $input)\\n}\\n"}',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  // const resp_fetchMovie = http.post(
  //   'http://localhost:3000/graphql',
  //   '{"operationName":"FetchMovie","variables":{"movie_id":3},"query":"query FetchMovie($movie_id: Int!) {\\n  movie(movieId: $movie_id) {\\n    ...Movie\\n    __typename\\n  }\\n}\\n\\nfragment Movie on Movie {\\n  movie_id\\n  title\\n  rating\\n  year\\n  director\\n  actors\\n  __typename\\n}\\n"}',
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )

  // const resp_fetchNextMovie = http.post(
  //   'http://localhost:3000/graphql',
  //   '{"operationName":"FetchNextMovie","variables":{"room_id":78676,"index":2},"query":"query FetchNextMovie($room_id: Int!, $index: Int!) {\\n  nextMovie(roomId: $room_id, curIndex: $index) {\\n    ...RoomMovieCollection\\n    __typename\\n  }\\n}\\n\\nfragment RoomMovieCollection on RoomMovieCollection {\\n  m_movie_id\\n  __typename\\n}\\n"}',
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )

  // /*
  // resp_createUser.user_id
  // print(resp_createUser.user_id)
  // print(String(resp_createUser.JSON.get("user_id")))*/

  // //console.log(resp_createUser.user_id)
  // //console.log(String(resp_createUser.JSON.get("user_id")))

  // const resp_addVote = http.post(
  //   'http://localhost:3000/graphql',
  //   '{"operationName":"AddVote","variables":{"input":{"room_id":55555,"movie_id":2,"user_id":1}},"query":"mutation AddVote($input: VoteInput!) {\\n  addVote(input: $input)\\n}\\n"}',
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )

  // const resp_fetchVotes = http.post(
  //   'http://localhost:3000/graphql',
  //   '{"operationName":"FetchVotes","variables":{"input":{"room_id":55555}},"query":"query FetchVotes($room_id: Int!) {\\n votes(roomId: $room_id) {\\n ...Vote \\n    __typename\\n }\\n}\\n\\nfragment Vote on Vote {\\n  movie_id\\n   __typename\\n}\\n"}',
  //   {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // )

  //http.get('http://localhost:3000/app/popcorn/results')
  //http.get('http://localhost:3000/app/popcorn/room')
  //http.get('http://localhost:3000/app/popcorn/swipe')

  // )
  // http.get('http://localhost:3000')
  // sleep(Math.random() * 3)
  // http.get('http://localhost:3000')
  // sleep(Math.random() * 3)
  // http.get('http://localhost:3000')
  // sleep(Math.random() * 3)
}

const count200 = new Counter('status_code_2xx')
const count300 = new Counter('status_code_3xx')
const count400 = new Counter('status_code_4xx')
const count500 = new Counter('status_code_5xx')

const rate200 = new Rate('rate_status_code_2xx')
const rate300 = new Rate('rate_status_code_3xx')
const rate400 = new Rate('rate_status_code_4xx')
const rate500 = new Rate('rate_status_code_5xx')

function recordRates(res) {
  if (res.status >= 200 && res.status < 300) {
    count200.add(1)
    rate200.add(1)
  } else if (res.status >= 300 && res.status < 400) {
    console.log(res.body)
    count300.add(1)
    rate300.add(1)
  } else if (res.status >= 400 && res.status < 500) {
    count400.add(1)
    rate400.add(1)
  } else if (res.status >= 500 && res.status < 600) {
    count500.add(1)
    rate500.add(1)
  }
}

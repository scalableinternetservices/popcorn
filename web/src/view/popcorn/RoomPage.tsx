import { useQuery, useSubscription } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useEffect } from 'react'
import { FetchUsersInRoom, UserSubscription, UserSubscriptionVariables } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { UserContext } from '../auth/user'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'
import { fetchUsersInRoom, subscribeUsers } from '../playground/fetchUsersInRoom'
import { handleError } from '../toast/error'

interface RoomPageProps extends RouteComponentProps, AppRouteParams {}

export function UsersInRoom(roomId: number) {
  const { loading, data, refetch } = useQuery<FetchUsersInRoom>(fetchUsersInRoom, {
    variables: { room_id: roomId },
  })
  if (loading || !data) {
    return <div>no users yet</div>
  }

  const [usersInRoom, setUsersInRoom] = React.useState(data?.usersInRoom)
  useEffect(() => {
    setUsersInRoom(data?.usersInRoom)
  }, [data])

  const sub = useSubscription<UserSubscription, UserSubscriptionVariables>(subscribeUsers, {
    variables: { roomId: roomId },
  })
  if (sub.data?.userUpdates) {
    refetch().catch(handleError)
    console.log('got subscription' + sub.data?.userUpdates?.name)
  }

  if (!data.usersInRoom) return <div>null users</div>
  if (data.usersInRoom.length === 0) return <div>no users in room</div>
  let html = ''
  if (!usersInRoom) {
    html = 'no users'
  } else {
    usersInRoom.forEach(function (user) {
      html += user?.name + ','
    })
  }
  return html.slice(0, -1)
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RoomPage(props: RoomPageProps) {
  const { user } = React.useContext(UserContext)

  if (!user) {
    return <div>Please Refresh Page</div>
  }

  return (
    <Page>
      <div style={{ padding: '20px', fontSize: '30px', border: 'black', margin: '10px', fontWeight: 'lighter' }}>
        Your Room Code Is: <span style={{ fontWeight: 'lighter' }}>{user.room_id}</span>
      </div>
      <div style={{ padding: '20px', fontSize: '30px', border: 'black', margin: '10px', fontWeight: 'lighter' }}>
        People In The Room:
      </div>
      {UsersInRoom(user.room_id)
        .toString()
        .split(',')
        .map(user => (
          <li key={user} style={{ fontWeight: 'lighter', marginLeft: '40px' }}>
            {user}
          </li>
        ))}
      <div style={{ padding: '20px', fontSize: '30px', margin: '10px', fontWeight: 'lighter', textAlign: 'center' }}>
        <Button
          onClick={() => {
            window.location.replace('/app/popcorn/swipe')
          }}
        >
          {' '}
          Enter{' '}
        </Button>
      </div>
      {}
    </Page>
  )
}

/*const NavAnchor = style('a', 'link black hover-bg-black-10 pa2 br2', (p: { $bold?: boolean; $title?: boolean }) => ({
  fontWeight: p.$bold ? 600 : 200,
  fontSize: p.$title ? '1.5em' : undefined,
}))
const NavLink = link(NavAnchor)*/

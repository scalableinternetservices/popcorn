import { useQuery } from '@apollo/client'
import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { FetchUsersInRoom } from '../../graphql/query.gen'
import { Button } from '../../style/button'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { link } from '../nav/Link'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'
import { fetchUsersInRoom } from '../playground/fetchUsersInRoom'



interface RoomPageProps extends RouteComponentProps, AppRouteParams {}

export function UsersInRoom(roomId: number) {
  console.log(roomId)
  const { loading, data } = useQuery<FetchUsersInRoom>(fetchUsersInRoom, { variables: { room_id: roomId } })
  if (loading) {
    return <div>loading...</div>
  }
  if (!data) {
    return <div>no votes</div>
  }
  console.log(data)
  if (!data.usersInRoom) return <div>null users</div>
  if (data.usersInRoom.length === 0) return <div>no users in room</div>

  var html = '';

  // Loop through each wizard and create a list item
  data.usersInRoom.forEach(function (user) {
    html += user?.name + ',';
  });
  //html = '<ul>' + html + '</ul>';

  return html
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function RoomPage(props: RoomPageProps) {
  const { user } = React.useContext(UserContext)

  if (!user) {
    return <div >Please Refresh Page</div>
  }


  return (
    <Page>
      <div style={{padding: "20px", fontSize: "30px", border: "black", margin: "10px", fontWeight: "lighter" }}>
        Your Room Code Is: {user.room_id}
      </div>
      <div style={{padding: "20px", fontSize: "30px", border: "black", margin: "10px", fontWeight: "lighter" }}>
        People In The Room:
      </div>
      { UsersInRoom(user.room_id) }
      <div style={{padding: "20px", fontSize: "30px", border: "black", borderStyle: "double", margin: "10px", fontWeight: "lighter", textAlign: "center" }}>
      <Button onClick={async () => { window.location.reload(); }}>Refresh</Button>
      </div>
      <div style={{padding: "20px", fontSize: "30px", border: "black", borderStyle: "double", margin: "10px", fontWeight: "lighter", textAlign: "center" }}>
      <NavLink to="app/popcorn/swipe"> Enter</NavLink>
      </div>
      {}
    </Page>
  )
}

const NavAnchor = style(
  'a',
  'link black hover-bg-black-10 pa2 br2',
  (p: { $bold?: boolean; $title?: boolean }) => ({
    fontWeight: p.$bold ? 600 : 200,
    fontSize: p.$title ? '1.5em' : undefined,
  })
)
const NavLink = link(NavAnchor)
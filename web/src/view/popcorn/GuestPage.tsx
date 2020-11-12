import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { useState } from 'react';
import { getApolloClient } from '../../graphql/apolloClient';
import { Button } from '../../style/button';
import { Input } from '../../style/input';
import { style } from '../../style/styled';
import { UserContext } from '../auth/user';
import { link } from '../nav/Link';
import { AppRouteParams } from '../nav/route';
import { Page } from '../page/Page';
import { addMovieUser } from '../playground/Guests';
import { handleError } from '../toast/error';



interface GuestPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GuestPage(props: GuestPageProps) {
  const [name, setName]= useState('')
  const [room_code, setRoomCode] = useState('')
  const { user } = React.useContext(UserContext)

  function doAddMovieUser() {
    console.log("lol", name, room_code)
    console.log("user!!!", user)
    addMovieUser(getApolloClient(), { room_id: 1, u_id: 12, name: name }).catch(handleError)
  }

  return (
    <Page>
      <div style={{margin: "30px"}}>
      <label style={{fontSize: "30px", margin: "10px", fontWeight: "lighter" }} htmlFor="name">
          Enter Name
      </label>
      <Input $onChange={setName} style={{marginTop: "12px"}} name="name" type="name" />
      </div>
      <div style={{margin: "30px"}}>
      <label style={{fontSize: "30px", margin: "10px", fontWeight: "lighter" }} htmlFor="room_code">
          Enter Room Code
      </label>
      <Input $onChange={setRoomCode} style={{marginTop: "12px"}} name="room_code" type="room_code" />
      <div style={{marginTop: "48px"}}>
      <span style={{padding: "12px", fontSize: "30px", border: "black", borderStyle: "double" }}>
        <NavLink to="app/popcorn/index">Back</NavLink>
      </span>
      <span style={{padding: "12px", fontSize: "30px", border: "black", borderStyle: "double", marginLeft: "240px" }}>
        <NavLink to="app/popcorn/room">
          <Button onClick={() => doAddMovieUser()}>Next</Button>
        </NavLink>
      </span>
      </div>
      </div>
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
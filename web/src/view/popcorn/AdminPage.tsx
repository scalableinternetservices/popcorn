import { RouteComponentProps } from '@reach/router'
// import { Multiselect } from 'multiselect-react-dropdown';
import * as React from 'react'
import { useState } from 'react'
import { check } from '../../../../common/src/util'
import { getApolloClient } from '../../graphql/apolloClient'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { style } from '../../style/styled'
import { UserContext } from '../auth/user'
import { link } from '../nav/Link'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'
import { handleError } from '../toast/error'
import { addRoomAndMovieUser } from './AddRoomAndMovieUser'

interface AdminPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AdminPage(props: AdminPageProps) {
  const [name, setName] = useState('')
  const [genres, setGenres] = useState('')
  const [maxSwipes, setMaxSwipes] = useState('')
  const { user } = React.useContext(UserContext)

  function doAddRoomAndMovieUser(new_room: number) {
    console.log('lol', name, genres, maxSwipes)
    console.log('user!!!', user)
    const [genre1, genre2] = genres.split(',')
    addRoomAndMovieUser(getApolloClient(), { genre1, genre2, room_id: new_room, name: name }).catch(handleError)
  }

  function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(89999) + 10000)
  }

  function login(new_room: number) {
    console.log('in login function in admin')

    fetch('/auth/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room_id: new_room, name: name }),
    })
      .then(res => {
        check(res.ok, 'response status ' + res.status)
        return res.text()
      })
      .then(() => window.location.replace('/app/popcorn/room'))
  }

  return (
    <Page>
      <div style={{ margin: '30px' }}>
        <label style={{ fontSize: '30px', margin: '10px', fontWeight: 'lighter' }} htmlFor="name">
          Enter Name
        </label>
        <Input $onChange={setName} style={{ marginTop: '12px' }} name="name" type="name" />
      </div>
      <div style={{ margin: '30px' }}>
        <label style={{ fontSize: '30px', margin: '10px', fontWeight: 'lighter' }} htmlFor="genres">
          Choose Genre/s
        </label>
        <Input $onChange={setGenres} style={{ marginTop: '12px' }} name="genre" type="genre" />
        {/* <Multiselect
        options={[{name: "Hi"}]} // Options to display in the dropdown
        // selectedValues={this.state.selectedValue} // Preselected value to persist in dropdown
        // onSelect={this.onSelect} // Function will trigger on select event
        // onRemove={this.onRemove} // Function will trigger on remove event
        displayValue="name" // Property name to display in the dropdown options
      /> */}
      </div>
      <div style={{ margin: '30px' }}>
        <label style={{ fontSize: '30px', margin: '10px', fontWeight: 'lighter' }} htmlFor="max-swipes">
          Choose Max Swipes
        </label>
        <Input $onChange={setMaxSwipes} style={{ marginTop: '12px' }} name="max-swipes" type="max-swipes" />
      </div>
      <div style={{ marginTop: '48px' }}>
        <span style={{ padding: '12px', fontSize: '30px' }}>
          <NavLink to="app/popcorn/index">
            <Button>Back</Button>
          </NavLink>
        </span>
        <span style={{ padding: '12px', fontSize: '30px', marginLeft: '240px' }}>
          <Button
            onClick={async () => {
              const new_room = getRandomInt()
              login(new_room)
              doAddRoomAndMovieUser(new_room)
              console.log('user!!!', React.useContext(UserContext))
            }}
          >
            Next
          </Button>
        </span>
      </div>
    </Page>
  )
}

const NavAnchor = style('a', 'link black hover-bg-black-10 pa2 br2', (p: { $bold?: boolean; $title?: boolean }) => ({
  fontWeight: p.$bold ? 600 : 200,
  fontSize: p.$title ? '1.5em' : undefined,
}))
const NavLink = link(NavAnchor)

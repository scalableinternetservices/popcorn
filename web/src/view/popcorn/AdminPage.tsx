import { RouteComponentProps } from '@reach/router'
// import { Multiselect } from 'multiselect-react-dropdown';
import * as React from 'react'
import { useState } from 'react'
import MultiSelect from 'react-multi-select-component'
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
  const [maxSwipes, setMaxSwipes] = useState('')

  function doAddRoomAndMovieUser(new_room: number) {
    const [genre1, genre2] = [genres[0].value, genres[1].value]
    const swipe_num: number = +maxSwipes
    addRoomAndMovieUser(getApolloClient(), {
      genre1,
      genre2,
      room_id: new_room,
      max_swipes: swipe_num,
      name: name,
    }).catch(handleError)
  }

  function getRandomInt() {
    return Math.floor(Math.random() * Math.floor(89999) + 10000)
  }

  const options = [
    { label: 'Action & Adventure', value: 'Action & Adventure' },
    { label: 'Anime Features', value: 'Anime Features' },
    { label: 'Children & Family Movies', value: 'Children & Family Movies' },
    { label: 'Classic Movies', value: 'Classic Movies' },
    { label: 'Comedies', value: 'Comedies' },
    { label: 'Cult Movies', value: 'Cult Movies' },
    { label: 'Documentaries', value: 'Documentaries' },
    { label: 'Dramas', value: 'Dramas' },
    { label: 'Faith & Spirituality', value: 'Faith & Spirituality' },
    { label: 'Horror Movies', value: 'Horror Movies' },
    { label: 'Independent Movies', value: 'Independent Movies' },
    { label: 'LGBTQ Movies', value: 'LGBTQ Movies' },
    { label: 'Music & Musicals', value: 'Music & Musicals' },
    { label: 'Romantic Movies', value: 'Romantic Movies' },
    { label: 'Sci-Fi & Fantasy', value: 'Sci-Fi & Fantasy' },
    { label: 'Sports Movies', value: 'Sports Movies' },
    { label: 'Stand-Up Comedy', value: 'Stand-Up Comedy' },
    { label: 'Sports Movies', value: 'Sports Movies' },
    { label: 'Thrillers', value: 'Thrillers' },
  ]

  const [genres, setGenres] = useState<any[]>([])

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
        <label
          style={{
            fontSize: '30px',
            margin: '10px',
            fontWeight: 'lighter',
          }}
          htmlFor="name"
        >
          Enter Name
        </label>
        <Input
          $onChange={setName}
          style={{ marginTop: '12px', borderRadius: '4px', border: 'transparent', backgroundColor: 'white' }}
          name="name"
          type="name"
        />
      </div>
      <div style={{ margin: '30px' }}>
        <label style={{ fontSize: '30px', margin: '10px', fontWeight: 'lighter' }} htmlFor="genres">
          Choose 2 Genres
        </label>
        <div style={{ marginTop: '10px' }}>
          <MultiSelect options={options} value={genres} onChange={setGenres} labelledBy={'Select'} />
        </div>
      </div>
      <div style={{ margin: '30px' }}>
        <label
          style={{
            fontSize: '30px',
            margin: '10px',
            fontWeight: 'lighter',
          }}
          htmlFor="max-swipes"
        >
          Choose Max Swipes
        </label>
        <Input
          $onChange={setMaxSwipes}
          style={{ marginTop: '12px', borderRadius: '4px', border: 'transparent', backgroundColor: 'white' }}
          name="max-swipes"
          type="max-swipes"
        />
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

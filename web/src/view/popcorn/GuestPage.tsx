import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { useState } from 'react'
import { check } from '../../../../common/src/util'
import { Button } from '../../style/button'
import { Input } from '../../style/input'
import { style } from '../../style/styled'
import { link } from '../nav/Link'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'

interface GuestPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GuestPage(props: GuestPageProps) {
  const [name, setName] = useState('')
  const [room_code, setRoomCode] = useState('')

  function login() {
    console.log('in login function in admin')

    fetch('/auth/createUser', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ room_id: room_code, name: name }),
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
        <label style={{ fontSize: '30px', margin: '10px', fontWeight: 'lighter' }} htmlFor="room_code">
          Enter Room Code
        </label>
        <Input $onChange={setRoomCode} style={{ marginTop: '12px' }} name="room_code" type="room_code" />
        <div style={{ marginTop: '48px' }}>
          <span style={{ fontSize: '30px' }}>
            <NavLink to="app/popcorn/index">
              <Button>Back</Button>
            </NavLink>
          </span>
          <span style={{ padding: '12px', fontSize: '30px', marginLeft: '240px' }}>
            <Button
              onClick={() => {
                login()
              }}
            >
              Next
            </Button>
          </span>
        </div>
      </div>
    </Page>
  )
}

const NavAnchor = style('a', 'link black hover-bg-black-10 pa2 br2', (p: { $bold?: boolean; $title?: boolean }) => ({
  fontWeight: p.$bold ? 600 : 200,
  fontSize: p.$title ? '1.5em' : undefined,
}))
const NavLink = link(NavAnchor)

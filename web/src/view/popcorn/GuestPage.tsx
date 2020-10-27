import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Input } from '../../style/input'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'

interface GuestPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function GuestPage(props: GuestPageProps) {
  return (
    <Page>
      <div style={{margin: "30px"}}>
      <label style={{padding: "20px", fontSize: "30px", margin: "10px" }} htmlFor="email">
          Enter Name
      </label>
      <Input name="name" type="name" />
      </div>
      <div style={{margin: "30px"}}>
      <label style={{padding: "20px", fontSize: "30px", margin: "10px" }} htmlFor="email">
          Enter Room Code
      </label>
      <Input name="room-code" type="room-code" />
      </div>
    </Page>
  )
}

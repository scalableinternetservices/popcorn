import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Input } from '../../style/input'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'

interface AdminPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AdminPage(props: AdminPageProps) {
  return (
    <Page>
      <div style={{margin: "30px"}}>
      <label style={{fontSize: "30px", margin: "10px" }} htmlFor="email">
          Enter Name
      </label>
      <Input name="name" type="name" />
      </div>
      <div style={{margin: "30px"}}>
      <label style={{fontSize: "30px", margin: "10px" }} htmlFor="email">
          Choose Genre/s
      </label>
      <Input name="genre" type="genre" />
      </div>
      <div style={{margin: "30px"}}>
      <label style={{fontSize: "30px", margin: "10px" }} htmlFor="email">
          Choose Max Swipes
      </label>
      <Input name="max-swipes" type="max-swipes" />
      </div>
    </Page>
  )
}

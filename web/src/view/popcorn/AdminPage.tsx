import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { Input } from '../../style/input';
import { style } from '../../style/styled';
import { link } from '../nav/Link';
import { AppRouteParams } from '../nav/route';
import { Page } from '../page/Page';

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
      <div style={{padding: "20px", fontSize: "30px", border: "black", borderStyle: "double", margin: "10px" }}>
        <NavLink to="app/popcorn/room">Enter</NavLink>
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
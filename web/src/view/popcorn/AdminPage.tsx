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
      <label style={{fontSize: "30px", margin: "10px", fontWeight: "lighter" }} htmlFor="name">
          Enter Name
      </label>
      <Input style={{marginTop: "12px"}} name="name" type="name" />
      </div>
      <div style={{margin: "30px"}}>
      <label style={{fontSize: "30px", margin: "10px", fontWeight: "lighter" }} htmlFor="genres">
          Choose Genre/s
      </label>
      <Input style={{marginTop: "12px"}} name="genre" type="genre" />
      </div>
      <div style={{margin: "30px"}}>
      <label style={{fontSize: "30px", margin: "10px", fontWeight: "lighter" }} htmlFor="max-swipes">
          Choose Max Swipes
      </label>
      <Input style={{marginTop: "12px"}} name="max-swipes" type="max-swipes" />
      </div>
      <div style={{marginTop: "48px"}}>
      <span style={{padding: "12px", fontSize: "30px", border: "black", borderStyle: "double", marginLeft: "28px" }}>
        <NavLink to="app/popcorn/index">Back</NavLink>
      </span>
      <span style={{padding: "12px", fontSize: "30px", border: "black", borderStyle: "double", marginLeft: "240px" }}>
        <NavLink to="app/popcorn/room">Next</NavLink>
      </span>
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
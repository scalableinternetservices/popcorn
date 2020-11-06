import { RouteComponentProps } from '@reach/router';
import * as React from 'react';
import { style } from '../../style/styled';
import { link } from '../nav/Link';
import { AppRouteParams } from '../nav/route';
import { Page } from '../page/Page';

interface HomePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function HomePage(props: HomePageProps) {
  return (
    <Page>
      <img style={{marginLeft: "32px"}} src="https://lh3.googleusercontent.com/proxy/O70PMisAo5uuH2SqcnTBSwSFg_ElXDRAkd6z43Ez5G8HmaeNrLAW6-2UQB0rJXNpGXSTz0Y22HKbbT6xd2xOagAiNjZcHo08j-VegwH2pdg4Vsmn1AyLw0d6ZxEAslcxnMU-BUv_O1JN7A"/>
      <div style={{padding: "20px", fontSize: "30px", border: "black", borderStyle: "double", margin: "10px" }}>
        <NavLink to="app/popcorn/admin">Create A Room</NavLink>
      </div>
      <div style={{padding: "20px", fontSize: "30px", border: "black", borderStyle: "double", margin: "10px", textAlign: "center" }}>
      <NavLink to="app/popcorn/guest">Join A Room</NavLink>
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
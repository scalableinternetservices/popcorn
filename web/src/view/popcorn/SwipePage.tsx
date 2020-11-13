import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Button } from '../../style/button'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'
import { addYesVotes, showMovie } from '../playground/Swipe'

interface SwipePageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SwipePage(props: SwipePageProps) {
  return (
    <Page>
      <div
        style={{
          padding: '20px',
          fontSize: '30px',
          border: 'black',
          borderStyle: 'double',
          margin: '10px',
          fontWeight: 'lighter',
        }}
      >
        Movie Image
      </div>
      <Button
        onClick={() => {
          addYesVotes
          showMovie
        }}
      >
        Yes
      </Button>
      <Button onClick={showMovie}>No</Button>
    </Page>
  )
}

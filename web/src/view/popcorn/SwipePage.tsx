import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { Button } from '../../style/button'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'

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
      <span style={{ padding: '12px', fontSize: '30px', border: 'black', borderStyle: 'double', marginLeft: '240px' }}>
        <Button
          onClick={() => {
            window.location.replace('/app/popcorn/results')
          }}
        >
          {' '}
          Done{' '}
        </Button>
      </span>
    </Page>
  )
}

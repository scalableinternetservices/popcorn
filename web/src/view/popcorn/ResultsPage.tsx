import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'

interface ResultsPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ResultsPage(props: ResultsPageProps) {
  return (
    <Page>
      <div style={{padding: "20px", fontSize: "30px", border: "black", borderStyle: "double", margin: "10px" }}>
        Results:
      </div>
    </Page>
  )
}
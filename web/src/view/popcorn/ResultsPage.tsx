import { RouteComponentProps } from '@reach/router'
import * as React from 'react'
import { AppRouteParams } from '../nav/route'
import { Page } from '../page/Page'
import { Votes } from '../playground/Results'

interface ResultsPageProps extends RouteComponentProps, AppRouteParams {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ResultsPage(props: ResultsPageProps) {
  return <Page> {getResultsPage()}</Page>
}

function getResultsPage() {
  return <Votes />
}

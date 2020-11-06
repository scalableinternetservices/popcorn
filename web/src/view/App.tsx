import { ApolloProvider, useQuery } from '@apollo/client'
import { Redirect, Router } from '@reach/router'
import * as React from 'react'
import { hydrate, render } from 'react-dom'
import { Provider as StyletronProvider } from 'styletron-react'
import { appContext } from '../../../common/src/context'
import { getApolloClient } from '../graphql/apolloClient'
import { FetchUserContext } from '../graphql/query.gen'
import { fetchUser } from './auth/fetchUser'
import { UserContext, UserCtx } from './auth/user'
import { Route } from './nav/route'
import { HomePage } from './page/HomePage'
import { LecturesPage } from './page/LecturesPage'
import { PlaygroundPage } from './page/PlaygroundPage'
import { ProjectsPage } from './page/ProjectsPage'
import { AdminPage as PopcornAdminPage } from './popcorn/AdminPage'
import { GuestPage as PopcornGuestPage } from './popcorn/GuestPage'
import { HomePage as PopcornHomePage } from './popcorn/HomePage'
import { ResultsPage as PopcornResultsPage } from './popcorn/ResultsPage'
import { RoomPage as PopcornRoomPage } from './popcorn/RoomPage'
import { SwipePage as PopcornSwipePage } from './popcorn/SwipePage'

const Styletron = require('styletron-engine-monolithic')

export function init() {
  const renderFn = appContext().serverRendered ? hydrate : render
  const engine = new Styletron.Client({
    hydrate: document.getElementsByClassName('_styletron_hydrate_'),
  })

  renderFn(
    <ApolloProvider client={getApolloClient()}>
      <StyletronProvider value={engine} >
        <App />
      </StyletronProvider>
    </ApolloProvider>,
    document.getElementById('app')
  )
}

export function App() {
  const { loading, data } = useQuery<FetchUserContext>(fetchUser)
  if (loading || data == null) {
    return null
  }

  return (
    <UserContext.Provider value={new UserCtx(data.self)}>
      <AppBody />
    </UserContext.Provider>
  )
}

export function AppBody() {
  return (
    <div style={{backgroundColor: "indianred"}}>
      <Router className={bodyClass}>
        <Redirect noThrow from="app" to="index" />
        <Redirect noThrow from="app/playground" to="surveys" />
        <HomePage path={Route.HOME} />
        <LecturesPage path={Route.LECTURES} />
        <ProjectsPage path={Route.PROJECTS} />
        <PlaygroundPage path={Route.PLAYGROUND} />
        <PlaygroundPage path={Route.PLAYGROUND_APP} />
        <PopcornHomePage path={Route.POPCORNHOME} />
        <PopcornAdminPage path={Route.POPCORNADMIN} />
        <PopcornGuestPage path={Route.POPCORNGUEST} />
        <PopcornRoomPage path={Route.POPCORNROOM} />
        <PopcornSwipePage path={Route.POPCORNSWIPE} />
        <PopcornResultsPage path={Route.POPCORNRESULTS} />
      </Router>
    </div>
  )
}

const bodyClass = 'flex flex-column items-center mh2 mh3-ns mh5-l pt6 min-vh-100 sans-serif'
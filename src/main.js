import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createStore from './store/createStore'
import AppContainer from './containers/AppContainer'

import addGraphQLSubscriptions from 'lib/utils/subscriptions'
import ApolloClient, { createNetworkInterface } from 'apollo-client'

import { ApolloProvider } from 'react-apollo'

const  sesssionValue = 'dUM0d0J1aTdLZXdlM09hZm1qU3FyMnhjK2FpalU5TDliYkNsOU0xTUJmUDBQZDFkUWtCci8vc0x1M1BuN1pzbVh0dm04M0F4QjBLL0YrTnU4ZUZ2TkJsVk1wemM4elVoZU05TkEyOWxOZUFsMVdKT1dBVisrZlRVSUdMR08vdW1VaVZWMlIxaW9qN1lEanlmbXJPenhKSVdCS25jQ2dFVVhVNFVydEZmei9jZHJTMmZ1RUNUMzIzcllSSmhqZGN4QkVHcEFWUjJxemRBNGNHSnpHK0RGNGM5bVVmYnlVTzdXeTJuY1lycjRUcjQ0emt4OWlGNFdNSFdaZFZZbXRLY20wS0V0VHBxK09GRjRqQ0tMZkJMNGh5MXpKTTRLWEdteHFqQk03cEZnUlh6Zy9QcmhFQUdxQTVMVHhqQmVWS3VDb3h0dmxKL3J1VWxQaXV2T2p4YWJoZDlFd0dnYVYxMTU1WmtLMlhZWEJZPS0tY3VrRGlpQkJnK0pDSDd2NzBhSUdLQT09--33ff21a5a75118afcbfbd097dde6155cd1926982'
const networkInterface = createNetworkInterface({
  uri: 'graphql-explorer.githubapp.com',
  opts: {
    _graphql_explorer_session: sesssionValue,

  },
  transportBatching: true,
});
const networkInterfaceWithSubscriptions = addGraphQLSubscriptions(
  networkInterface
);

const client = new ApolloClient({
  networkInterface: networkInterfaceWithSubscriptions
});

// ========================================================
// Browser History Setup
// ========================================================
const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

// ========================================================
// Store and History Instantiation
// ========================================================
// Create redux store and sync with react-router-redux. We have installed the
// react-router-redux reducer under the routerKey "router" in src/routes/index.js,
// so we need to provide a custom `selectLocationState` to inform
// react-router-redux of its location.
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState, browserHistory)
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root')

let render = (routerKey = null) => {
  const routes = require('./routes/index').default(store)

  ReactDOM.render(
    <ApolloProvider client={client}>
      <AppContainer
        store={store}
        history={history}
        routes={routes}
        routerKey={routerKey}
      />
    </ApolloProvider>,
    MOUNT_NODE
  )
}

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
  const renderApp = render
  const renderError = (error) => {
    const RedBox = require('redbox-react')

    ReactDOM.render(<RedBox error={error} />, MOUNT_NODE)
  }
  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  }
  module.hot.accept(['./routes/index'], () => render())
}

// ========================================================
// Go!
// ========================================================
render()

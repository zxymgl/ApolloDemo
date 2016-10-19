import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import ApolloClient from 'apollo-client';

const client = new ApolloClient();
export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    // Add sync reducers here
    router,
    apollo: client.reducer(),
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer

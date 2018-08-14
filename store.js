import { configure } from 'mobx'
import makeInspectable from 'mobx-devtools-mst'
import Store from './stores'
import getInitialState from './stores/state'
import merge from 'lodash/fp/merge'

import api from './lib/api'

import _ from 'lodash/fp'

const __NEXT_MOBX_STORE__ = '__NEXT_MOBX_STORE__'
let store = null

configure({ enforceActions: true })

function initializeStore(isServer, state) {
  const initialState = merge(state, getInitialState())
  if (isServer) {
    return new Store(isServer, initialState)
  } else {
    if (store === null) {
      store = new Store(isServer, initialState)
    }
    return makeInspectable(store)
  }
}

export function getOrCreateStore(isServer, initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_MOBX_STORE__]) {
    window[__NEXT_MOBX_STORE__] = initializeStore(isServer, initialState)
  }

  // provide tools for dev
  window._ = _
  window.store = window[__NEXT_MOBX_STORE__]
  window.api = api

  return window[__NEXT_MOBX_STORE__]
}

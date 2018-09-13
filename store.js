import { configure } from 'mobx'
import { create as createHydrator } from 'mobx-persist'
import makeInspectable from 'mobx-devtools-mst'
import Store from './stores'
import isServer from './lib/isServer'
import getInitialState from './stores/state'
import merge from 'lodash/fp/merge'

import api from './lib/api'

import { DateTime } from 'luxon'
import _ from 'lodash/fp'

const __NEXT_MOBX_STORE__ = '__NEXT_MOBX_STORE__'
let store = null

configure({ enforceActions: 'observed' })

function initializeStore(state) {
  const initialState = merge(state, getInitialState())
  if (isServer) {
    return new Store(isServer(), initialState)
  } else {
    if (store === null) {
      store = new Store(isServer(), initialState)
    }
    return makeInspectable(store)
  }
}

export function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer()) {
    return initializeStore(initialState)
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window[__NEXT_MOBX_STORE__]) {
    const store = initializeStore(initialState)
    createHydrator()('store', store)
    window[__NEXT_MOBX_STORE__] = store
  }

  // provide tools for dev
  if (!window.store) {
    window._ = _
    window.DT = DateTime
    window.store = window[__NEXT_MOBX_STORE__]
    window.api = api
    window.getState = store => JSON.parse(JSON.stringify(store))
    Object.defineProperty(window, 'state', {
      get: () => window.getState(window.store)
    })
  }

  return window[__NEXT_MOBX_STORE__]
}

import { action, observable, flow } from 'mobx'
import { wallet } from '../lib/api'
import { getOrCreateStore } from '../store'
import EosKeyStore from './eos_key'

import defer from 'lodash/fp/defer'
import forEach from 'lodash/fp/forEach'
import map from 'lodash/fp/map'

export default class EosWalletStore {
  name = ''
  password = ''

  @observable unlocked = false
  @observable opened = false
  @observable keys = {}

  constructor(isServer, { name, password }) {
    this.name = name
    this.password = password
  }

  @action init = flow(function*() {
    yield this.open()
    yield this.unlock()
    yield this.fetchKeys()
  })

  @action open = flow(function*() {
    try {
      this.opened = yield wallet.open(this.name)
      return this.opened
    } catch (e) {
      console.warn(e)
      return false
    }
  })

  @action unlock = flow(function*() {
    try {
      this.unlocked = yield wallet.unlock(this.name, this.password)
      return this.unlocked
    } catch (e) {
      console.warn(e)
      return false
    }
  })

  @action fetchKeys = flow(function*() {
    try {
      return this.addKeys(yield wallet.listKeys(this.name, this.password))
    } catch (e) {
      console.warn(e)
      return []
    }
  })

  @action addKeys = flow(function*(keys) {
    return map(key => {
      return this.addKey(key)
    }, keys)
  })

  @action addKey = flow(function*(key) {
    const keyStore = new EosKeyStore(false, key)
    keyStore.emitSideEffects()
    this.keys[keyStore.public_key] = keyStore
    return keyStore
  })
}

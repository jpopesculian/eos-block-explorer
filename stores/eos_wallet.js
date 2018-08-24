import { action, observable, flow } from 'mobx'
import { wallet } from '../lib/api'
import { getOrCreateStore } from '../store'

import defer from 'lodash/fp/defer'
import forEach from 'lodash/fp/forEach'

export default class EosWalletStore {
  name = ''
  password = ''

  @observable unlocked = false
  @observable opened = false
  @observable keys = []

  constructor(isServer, { name, password }) {
    this.name = name
    this.password = password
  }

  @action init = flow(function*() {
    yield this.open()
    yield this.unlock()
    yield this.getKeys()
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

  @action getKeys = flow(function*() {
    try {
      this.keys = yield wallet.listKeys(this.name, this.password)
      this.addAccountsFromKeys()
      return this.keys
    } catch (e) {
      console.warn(e)
      return []
    }
  })

  addAccountsFromKeys = () => {
    if (this.keys.length < 1) {
      return []
    }
    const store = getOrCreateStore()
    forEach(({ public_key }) => {
      defer(() => store.eosAccounts.fetchFromKey(public_key))
      return public_key
    }, this.keys)
  }
}

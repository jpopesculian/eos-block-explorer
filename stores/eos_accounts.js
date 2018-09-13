import { action, observable, computed, autorun, flow } from 'mobx'
import { chain, history } from '../lib/api'
import EosAccountStore from './eos_account'
import isServer from '../lib/isServer'

import { map, forEach, defer } from 'lodash'

export default class EosAccountsStore {
  @observable accounts = new Map()

  constructor({ accountNames }) {
    if (!isServer()) {
      forEach(accountName => defer(() => this.fetch(accountName)), accountNames)
    }
  }

  @action fetch = flow(function*(accountName) {
    try {
      return this.add(yield chain.getAccount(accountName))
    } catch (e) {
      return console.warn(e)
    }
  })

  @action fetchFromKey = flow(function*(publicKey) {
    try {
      const accountNames = yield history.getKeyAccounts(publicKey)
      return Promise.all(
        map(accountName => this.fetch(accountName), accountNames)
      )
    } catch (e) {
      return console.warn(e)
    }
  })

  @action add = account => {
    const accountStore = new EosAccountStore(account)
    this.accounts.set(accountStore.name, accountStore)
    accountStore.emitSideEffects()
    return accountStore
  }

  @computed get names() {
    return map('name', this.accounts.values())
  }
}

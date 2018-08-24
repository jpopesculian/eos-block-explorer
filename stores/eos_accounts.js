import { action, observable, computed, autorun, flow } from 'mobx'
import { chain, history } from '../lib/api'
import EosAccountStore from './eos_account'

import map from 'lodash/fp/map'
import forEach from 'lodash/fp/forEach'
import defer from 'lodash/fp/defer'

export default class EosAccountsStore {
  @observable accounts = {}

  constructor(isServer, { accountNames }) {
    if (!isServer) {
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
    const accountStore = new EosAccountStore(false, account)
    this.accounts[accountStore.name] = accountStore
    accountStore.emitSideEffects()
    return accountStore
  }
}

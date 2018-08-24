import { action, observable, computed, autorun, flow } from 'mobx'
import { chain, history } from '../lib/api'

import map from 'lodash/fp/map'

export default class EosAccountsStore {
  @observable accounts = {}

  constructor(isServer, initialState) {}

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
    this.accounts[account.account_name] = account
    return account
  }
}

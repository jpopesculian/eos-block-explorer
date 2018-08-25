import { action, observable, computed, autorun, flow } from 'mobx'
import { chain } from '../lib/api'
import { getOrCreateStore } from '../store'

import { defer, map } from 'lodash'

export default class EosTokenStore {
  @observable stats = {}
  @observable balances = {}
  code = ''
  symbol = ''

  constructor(isServer, { symbol, code }) {
    this.symbol = symbol
    this.code = code
  }

  get key() {
    return `${this.code}:${this.symbol}`
  }

  @action fetchStats = flow(function*() {
    try {
      this.stats = yield chain.getCurrencyStats({
        symbol: this.symbol,
        code: this.code
      })
      return this.stats
    } catch (e) {
      console.warn(e)
    }
  })

  @action fetchBalances = () => {
    const store = getOrCreateStore()
    return Promise.all(
      map(accountName => {
        return this.fetchBalance(accountName)
      }, store.eosAccounts.names)
    )
  }

  @action fetchBalance = flow(function*(accountName) {
    try {
      const balance = yield chain.getCurrencyBalance({
        account: accountName,
        code: this.code,
        symbol: this.symbol
      })
      this.balances[accountName] = balance
      return balance
    } catch (e) {}
  })

  @action update = () => {
    return Promise.all([this.fetchStats(), this.fetchBalances()])
  }

  emitSideEffects = () => {}
}

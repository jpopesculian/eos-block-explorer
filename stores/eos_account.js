import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'

import { defer, forEach } from 'lodash'

export default class EosAccountStore {
  account = {}

  constructor(isServer, account) {
    this.account = account
  }

  get name() {
    return this.account.account_name
  }

  emitSideEffects = () => {
    let store = getOrCreateStore()
    defer(() => store.eosSmartContracts.fetch(this.name))
    defer(() =>
      forEach(token => token.fetchBalance(this.name), store.eosTokens.tokens)
    )
  }
}

import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'

import defer from 'lodash/fp/defer'

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
  }
}

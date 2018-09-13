import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'

import { DateTime } from 'luxon'
import { defer } from 'lodash'

export default class EosAccountStore {
  @observable account = new Map()

  constructor(account) {
    this.account.replace(account)
  }

  get name() {
    return this.account.get('account_name')
  }

  get created() {
    return DateTime.fromISO(this.account.get('created'))
  }

  get updated() {
    return DateTime.fromISO(this.account.get('last_code_update'))
  }

  get ramUsage() {
    return this.account.get('ram_usage')
  }

  emitSideEffects = () => {
    let store = getOrCreateStore()
    defer(() => store.eosSmartContracts.fetch(this.name))
    defer(() =>
      store.eosTokens.tokens.forEach(token => token.fetchBalance(this.name))
    )
  }
}

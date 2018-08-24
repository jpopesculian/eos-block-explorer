import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'

import some from 'lodash/fp/some'
import forEach from 'lodash/fp/forEach'
import filter from 'lodash/fp/filter'
import map from 'lodash/fp/map'

const NEW_ACCOUNT_ACTION = { account: 'eosio', name: 'newaccount' }

export default class EosTransactionStore {
  trx = {}
  meta = {}

  constructor(isServer, { trx, ...meta }) {
    this.meta = meta
    this.trx = trx
  }

  get id() {
    return this.trx.id
  }

  get actions() {
    return this.trx.transaction.actions
  }

  get isNewAccountTransaction() {
    return some(NEW_ACCOUNT_ACTION, this.actions)
  }

  get newAccountNames() {
    return map(
      action => action.data.name,
      filter(NEW_ACCOUNT_ACTION, this.actions)
    )
  }

  get expiration() {
    return new Date(this.trx.transaction.expiration)
  }

  emitSideEffects = () => {
    if (!this.isNewAccountTransaction) {
      return
    }
    let store = getOrCreateStore()
    forEach(accountName => {
      defer(() => store.eosAccounts.fetch(accountName))
    }, this.newAccountNames)
  }
}

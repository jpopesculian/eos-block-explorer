import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'

import { some, forEach, filter, map, includes, defer } from 'lodash'

const NEW_ACCOUNT_ACTION = { account: 'eosio', name: 'newaccount' }
const TOKEN_TRANSFER_ACTION_NAMES = ['issue', 'transfer']
const TOKEN_CREATE_ACTION_NAMES = ['create']

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

  get tokenTransferActions() {
    const store = getOrCreateStore()
    const tokenAccounts = store.eosTokens.tokenAccounts
    return filter(
      ({ account, name }) =>
        includes(account, tokenAccounts) &&
        includes(name, TOKEN_TRANSFER_ACTION_NAMES),
      this.actions
    )
  }

  get tokenCreateActions() {
    const store = getOrCreateStore()
    const tokenAccounts = store.eosTokens.tokenAccounts
    return filter(
      ({ account, name }) =>
        includes(account, tokenAccounts) &&
        includes(name, TOKEN_CREATE_ACTION_NAMES),
      this.actions
    )
  }

  get isTokenTransferTransaction() {
    this.tokenTransferActions.length > 0
  }

  get isTokenCreateTransaction() {
    this.tokenCreateActions.length > 0
  }

  get transferedTokens() {
    return map(action => {
      const symbol = action.data.quantity.split(' ')[1]
      return {
        symbol,
        code: action.account
      }
    }, this.tokenTransferActions)
  }

  get createdTokens() {
    return map(action => {
      const symbol = action.data.maximum_supply.split(' ')[1]
      return {
        symbol,
        code: action.account
      }
    }, this.tokenCreateActions)
  }

  get expiration() {
    return new Date(this.trx.transaction.expiration)
  }

  emitSideEffects = () => {
    const store = getOrCreateStore()
    forEach(accountName => {
      defer(() => store.eosAccounts.fetch(accountName))
    }, this.newAccountNames)
    forEach(token => {
      defer(() => store.eosTokens.add(token))
    }, this.createdTokens)
    forEach(token => {
      defer(() => store.eosTokens.update(token))
    }, this.transferedTokens)
  }
}

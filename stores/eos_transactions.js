import { action, observable, computed, autorun, flow } from 'mobx'
import { persist } from 'mobx-persist'
import { getOrCreateStore } from '../store'
import EosTransactionStore from './eos_transaction'

import orderBy from 'lodash/fp/orderBy'
import values from 'lodash/fp/values'
import defer from 'lodash/fp/defer'

export default class EosTransactionsStore {
  @persist('map', EosTransactionStore)
  @observable
  transactions = new Map()

  constructor(initialState) {}

  @action add = transaction => {
    const transactionStore = new EosTransactionStore(transaction)
    this.transactions.set(transactionStore.id, transactionStore)
    transactionStore.emitSideEffects()
    return transactionStore
  }

  @computed get transactionList() {
    return orderBy('expiration', 'desc', this.transactions.values())
  }
}

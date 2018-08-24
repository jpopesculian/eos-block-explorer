import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'
import EosTransactionStore from './eos_transaction'

import orderBy from 'lodash/fp/orderBy'
import values from 'lodash/fp/values'
import defer from 'lodash/fp/defer'

export default class EosTransactionsStore {
  @observable transactions = {}

  constructor(isServer, initialState) {}

  @action add = transaction => {
    const transactionStore = new EosTransactionStore(false, transaction)
    this.transactions[transactionStore.id] = transactionStore
    transactionStore.emitSideEffects()
    return transactionStore
  }

  @computed get transactionList() {
    return orderBy('expiration', 'desc', values(this.transactions))
  }
}

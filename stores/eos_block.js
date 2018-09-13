import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'

import forEach from 'lodash/fp/forEach'
import defer from 'lodash/fp/defer'

export default class EosBlockStore {
  block = {}

  constructor(block) {
    this.block = block
  }

  get num() {
    return this.block['block_num']
  }

  get transactions() {
    return this.block['transactions']
  }

  emitSideEffects = () => {
    if (this.transactions.length < 1) {
      return
    }
    const store = getOrCreateStore()
    forEach(transaction => {
      defer(() => store.eosTransactions.add(transaction))
    }, this.transactions)
  }
}

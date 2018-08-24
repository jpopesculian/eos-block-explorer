import { action, observable, computed, autorun, flow } from 'mobx'

import orderBy from 'lodash/fp/orderBy'
import values from 'lodash/fp/values'

export default class EosTransactionsStore {
  @observable transactions = {}

  constructor(isServer, initialState) {}

  @action add = transaction => {
    this.transactions[transaction.trx.id] = transaction
  }

  @computed get transactionList() {
    return orderBy(
      'trx.transaction.ref_block_num',
      'desc',
      values(this.transactions)
    )
  }
}

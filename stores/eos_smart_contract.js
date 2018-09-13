import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'

export default class EosSmartContractStore {
  smart_contract = {}

  constructor(smart_contract) {
    this.smart_contract = smart_contract
  }

  get hasCode() {
    return !!this.smart_contract['abi']
  }

  get accountName() {
    return this.smart_contract['account_name']
  }
}

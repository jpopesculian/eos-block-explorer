import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'
import { chain } from '../lib/api'
import EosSmartContractStore from './eos_smart_contract'

export default class EosSmartContractsStore {
  @observable smart_contracts = new Map()

  constructor(initialState) {}

  @action fetch = flow(function*(accountName) {
    try {
      return this.add(yield chain.getCode(accountName))
    } catch (e) {
      return console.warn(e)
    }
  })

  @action add = smartContract => {
    const smartContractStore = new EosSmartContractStore(smartContract)
    if (!smartContractStore.hasCode) {
      return {}
    }
    this.smart_contracts.set(smartContractStore.accountName, smartContractStore)
    return smartContractStore
  }

  emitSideEffects = () => {
    let store = getOrCreateStore()
    // add smart contracts
  }
}

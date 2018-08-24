import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'
import { chain } from '../lib/api'
import EosSmartContractStore from './eos_smart_contract'

export default class EosSmartContractsStore {
  smart_contracts = {}

  constructor(isServer, initialState) {}

  @action fetch = flow(function*(accountName) {
    try {
      return this.add(yield chain.getCode(accountName))
    } catch (e) {
      return console.warn(e)
    }
  })

  @action add = smartContract => {
    const smartContractStore = new EosSmartContractStore(false, smartContract)
    if (!smartContractStore.hasCode) {
      return {}
    }
    this.smart_contracts[smartContractStore.accountName] = smartContractStore
    return smartContractStore
  }

  emitSideEffects = () => {
    let store = getOrCreateStore()
    // add smart contracts
  }
}

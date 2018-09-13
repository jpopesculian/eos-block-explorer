import { action, observable } from 'mobx'
import { persist } from 'mobx-persist'
import ClockStore from './clock'
import EosSettingsStore from './eos_settings'
import EosBlocksStore from './eos_blocks'
import EosWalletsStore from './eos_wallets'
import EosTransactionsStore from './eos_transactions'
import EosAccountsStore from './eos_accounts'
import EosSmartContractsStore from './eos_smart_contracts'
import EosProducerStore from './eos_producer'
import EosTokensStore from './eos_tokens'

export default class Store {
  @observable clock = undefined
  @observable eosSettings = undefined
  @observable eosBlocks = undefined
  @observable eosWallets = undefined

  @persist('object', EosTransactionsStore)
  @observable
  eosTransactions = undefined

  @observable eosAccounts = undefined
  @observable eosSmartContracts = undefined
  @observable eosTokens = undefined

  constructor(
    isServer,
    {
      clock,
      eosSettings,
      eosBlocks,
      eosWallets,
      eosTransactions,
      eosAccounts,
      eosSmartContracts,
      eosProducer,
      eosTokens
    }
  ) {
    this.clock = new ClockStore(clock)
    this.eosSettings = new EosSettingsStore(eosSettings)
    this.eosBlocks = new EosBlocksStore(eosBlocks)
    this.eosWallets = new EosWalletsStore(eosWallets)
    this.eosTransactions = new EosTransactionsStore(eosTransactions)
    this.eosAccounts = new EosAccountsStore(eosAccounts)
    this.eosSmartContracts = new EosSmartContractsStore(eosSmartContracts)
    this.eosProducer = new EosProducerStore(eosProducer)
    this.eosTokens = new EosTokensStore(eosTokens)
  }
}

import { action, observable } from 'mobx'
import ClockStore from './clock'
import EosSettingsStore from './eos_settings'
import EosBlocksStore from './eos_blocks'
import EosWalletsStore from './eos_wallets'
import EosTransactionsStore from './eos_transactions'
import EosAccountsStore from './eos_accounts'
import EosSmartContractsStore from './eos_smart_contracts'
import EosProducerStore from './eos_producer'

export default class Store {
  @observable clock = undefined
  @observable eosSettings = undefined
  @observable eosBlocks = undefined
  @observable eosWallets = undefined
  @observable eosTransactions = undefined
  @observable eosAccounts = undefined
  @observable eosSmartContracts = undefined

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
      eosProducer
    }
  ) {
    this.clock = new ClockStore(isServer, clock)
    this.eosSettings = new EosSettingsStore(isServer, eosSettings)
    this.eosBlocks = new EosBlocksStore(isServer, eosBlocks)
    this.eosWallets = new EosWalletsStore(isServer, eosWallets)
    this.eosTransactions = new EosTransactionsStore(isServer, eosTransactions)
    this.eosAccounts = new EosAccountsStore(isServer, eosAccounts)
    this.eosSmartContracts = new EosSmartContractsStore(
      isServer,
      eosSmartContracts
    )
    this.eosProducer = new EosProducerStore(isServer, eosProducer)
  }
}

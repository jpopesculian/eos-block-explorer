import { action, observable, autorun } from 'mobx'
import EosWalletStore from './eos_wallet'
import isServer from '../lib/isServer'

import forEach from 'lodash/fp/forEach'
import defer from 'lodash/fp/defer'

export default class EosWalletsStore {
  @observable wallets = new Map()

  constructor({ walletConfig }) {
    forEach(config => this.load(config), walletConfig)
  }

  @action load = config => {
    const wallet = new EosWalletStore(config)
    if (!isServer()) {
      defer(() => wallet.init())
    }
    this.wallets.set(config.name, wallet)
  }
}

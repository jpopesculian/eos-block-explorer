import { action, observable, autorun } from 'mobx'
import EosWalletStore from './eos_wallet'

import forEach from 'lodash/fp/forEach'
import defer from 'lodash/fp/defer'

export default class EosWalletsStore {
  @observable wallets = {}

  constructor(isServer, { walletConfig }) {
    forEach(config => this.load(isServer, config), walletConfig)
  }

  @action load = (isServer, config) => {
    const wallet = new EosWalletStore(isServer, config)
    if (!isServer) {
      defer(() => wallet.init())
    }
    this.wallets[config.name] = wallet
  }
}

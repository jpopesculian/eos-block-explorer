import { action, observable, computed, autorun, flow } from 'mobx'
import { chain } from '../lib/api'
import isServer from '../lib/isServer'
import EosTokenStore from './eos_token'

import { defer, forEach, map } from 'lodash'

export default class EosTokensStore {
  @observable tokens = {}

  constructor(isServer, { tokenConfig }) {
    forEach(token => {
      this.add(token)
    }, tokenConfig)
  }

  @action add = token => {
    const tokenStore = new EosTokenStore(false, token)
    this.tokens[tokenStore.key] = tokenStore
    if (!isServer()) {
      defer(() => tokenStore.update())
    }
    return tokenStore
  }

  @action update = token => {
    const key = `${token.code}:${token.symbol}`
    if (this.tokens[key]) {
      this.tokens[key].update()
    } else {
      this.add(token)
    }
  }

  @computed get tokenAccounts() {
    return map('code', this.tokens)
  }
}

import { action, observable, computed, autorun, flow } from 'mobx'
import { chain } from '../lib/api'
import isServer from '../lib/isServer'
import EosTokenStore from './eos_token'

import { defer, forEach, map } from 'lodash'

export default class EosTokensStore {
  @observable tokens = new Map()

  constructor({ tokenConfig }) {
    forEach(token => {
      this.add(token)
    }, tokenConfig)
  }

  @action add = token => {
    const tokenStore = new EosTokenStore(token)
    this.tokens.set(tokenStore.key, tokenStore)
    if (!isServer()) {
      defer(() => tokenStore.update())
    }
    return tokenStore
  }

  @action update = token => {
    const key = `${token.code}:${token.symbol}`
    if (this.tokens.has('key')) {
      this.tokens.get('key').update()
    } else {
      this.add(token)
    }
  }

  @computed get tokenAccounts() {
    return map('code', this.tokens.values())
  }
}

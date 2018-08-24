import { action, observable, computed, autorun, flow } from 'mobx'
import { getOrCreateStore } from '../store'

import defer from 'lodash/fp/defer'

export default class EosKeyStore {
  public_key = ''
  private_key = ''

  constructor(isServer, { public_key, private_key }) {
    this.public_key = public_key
    this.private_key = private_key
  }

  emitSideEffects = () => {
    const store = getOrCreateStore()
    defer(() => store.eosAccounts.fetchFromKey(this.public_key))
  }
}

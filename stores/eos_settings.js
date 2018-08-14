import { action, observable, computed, autorun } from 'mobx'
import EosApi from 'eosjs-api'

export default class EosSettingsStore {
  @observable host = '127.0.0.1'
  @observable port = 8888

  constructor(isServer, { host, port, transactions, blocks }) {
    this.host = host
    this.port = port
  }

  @computed get server() {
    return `http://${this.host}${this.port ? ':' + this.port : ''}`
  }

  @computed get apiConfig() {
    return {
      httpEndpoint: this.server
    }
  }
}

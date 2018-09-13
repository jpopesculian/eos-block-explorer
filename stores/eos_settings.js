import { action, observable, computed, autorun } from 'mobx'
import EosApi from 'eosjs-api'

export default class EosSettingsStore {
  @observable nodeosHost = '127.0.0.1'
  @observable nodeosPort = 8888
  @observable keosHost = '127.0.0.1'
  @observable keosPort = 8900

  constructor({ nodeosHost, nodeosPort, keosHost, keosPort }) {
    this.nodeosHost = nodeosHost
    this.nodeosPort = nodeosPort
    this.keosHost = keosHost
    this.keosPort = keosPort
  }

  @computed get nodeosServer() {
    return `http://${this.nodeosHost}${this.nodeosPort ? ':' + this.nodeosPort : ''}`
  }

  @computed get keosServer() {
    return `http://${this.keosHost}${this.keosPort ? ':' + this.keosPort : ''}`
  }

  @computed get apiConfig() {
    return {
      nodeosEndpoint: this.nodeosServer,
      keosEndpoint: this.keosServer
    }
  }
}

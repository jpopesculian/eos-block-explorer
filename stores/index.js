import { action, observable } from 'mobx'
import ClockStore from './clock'
import EosSettingsStore from './eos_settings'
import EosBlocksStore from './eos_blocks'

export default class Store {
  @observable clock = undefined
  @observable eos_settings = undefined
  @observable eos_blocks = undefined

  constructor(isServer, { clock, eos_settings, eos_blocks }) {
    this.clock = new ClockStore(isServer, clock)
    this.eos_settings = new EosSettingsStore(isServer, eos_settings)
    this.eos_blocks = new EosBlocksStore(isServer, eos_blocks)
  }
}

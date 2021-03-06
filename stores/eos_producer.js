import { action, observable, computed, autorun, flow } from 'mobx'
import { producer } from '../lib/api'
import isServer from '../lib/isServer'

import defer from 'lodash/fp/defer'

export default class EosProducerStore {
  @observable running = undefined

  constructor(initialState) {
    if (!isServer()) {
      defer(() => this.checkPaused())
    }
  }

  @action pause = flow(function*() {
    try {
      const success = yield producer.pause()
      if (success) {
        this.running = false
      }
      return success
    } catch (e) {
      console.warn(e)
    }
  })

  @action resume = flow(function*() {
    try {
      const success = yield producer.resume()
      if (success) {
        this.running = true
      }
      return success
    } catch (e) {
      console.warn(e)
    }
  })

  @action toggle = () => {
    return this.running ? this.pause() : this.resume()
  }

  @action checkPaused = flow(function*() {
    try {
      const paused = yield producer.paused()
      this.running = !paused
      return true
    } catch (e) {
      console.warn(e)
    }
  })
}

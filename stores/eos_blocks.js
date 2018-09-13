import { action, observable, computed, autorun, flow } from 'mobx'
import { chain } from '../lib/api'
import EosBlockStore from './eos_block'

import { getOrCreateStore } from '../store'

import {
  range,
  isEmpty,
  values,
  keys,
  orderBy,
  reduce,
  map,
  forEach,
  reject,
  unset,
  defer
} from 'lodash'

export default class EosBlocksStore {
  delay = 250
  maxAmount = 100
  fetchAmount = 10
  timer = undefined
  @observable running = false
  @observable blocks = new Map()
  @observable info = new Map()

  constructor({ delay }) {
    this.delay = delay
  }

  @action start = flow(function*() {
    this.running = true
    yield this.updateHeadBlock()
    this.timer = setTimeout(() => this.start(), this.delay)
  })

  @action updateHeadBlock = flow(function*() {
    try {
      const info = yield chain.getInfo()
      this.info.replace(info)
      const newBlocks = yield this.fetchNewBlocks(info.head_block_num)
      this.clearOldBlocks()
      return newBlocks
    } catch (e) {
      return console.warn(e)
    }
  })

  @action fetchNewBlocks = flow(function*(headBlockNum) {
    if (isEmpty(this.blocks)) {
      return yield this.fetchRange(
        headBlockNum,
        headBlockNum - this.fetchAmount
      )
    } else if (headBlockNum > this.headBlockNum) {
      const lastBlockNum = Math.max(
        this.headBlockNum,
        headBlockNum - this.maxAmount
      )
      return yield this.fetchRange(headBlockNum, lastBlockNum)
    }
  })

  @action fetchRange = (hi, lo) => {
    return Promise.all(map(blockNum => this.fetch(blockNum), range(lo, hi)))
  }

  @action fetch = flow(function*(blockNum) {
    try {
      return this.add(yield chain.getBlock(blockNum))
    } catch (e) {
      return console.warn(e)
    }
  })

  @action add = block => {
    const blockStore = new EosBlockStore(block)
    this.blocks.set(blockStore.num, blockStore)
    blockStore.emitSideEffects()
    return blockStore
  }

  @action clearOldBlocks = () => {
    const lastAllowedBlockNum = this.headBlockNum - this.maxAmount
    if (this.tailBlockNum < lastAllowedBlockNum) {
      return map(
        blockNum => this.blocks.delete(blockNum),
        range(this.tailBlockNum, lastAllowedBlockNum)
      )
    }
  }

  @computed get blockList() {
    return orderBy('num', 'desc', values(this.blocks.toJSON()))
  }

  @computed get headBlockNum() {
    return reduce(
      (result, blockNum) => (blockNum > result ? blockNum : result),
      -1,
      this.blockNums
    )
  }

  @computed get tailBlockNum() {
    return reduce(
      (result, blockNum) => (blockNum < result ? blockNum : result),
      Infinity,
      this.blockNums
    )
  }

  @computed get blockNums() {
    return reject(isNaN, map(parseInt, keys(this.blocks.toJSON())))
  }

  @computed get producer() {
    return this.info.get('head_block_producer')
  }

  @action stop = () => {
    this.running = false
    clearTimeout(this.timer)
  }
}

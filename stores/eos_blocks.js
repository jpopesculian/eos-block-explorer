import { action, observable, computed, autorun, flow } from 'mobx'
import { chain } from '../lib/api'

import { getOrCreateStore } from '../store'

import range from 'lodash/fp/range'
import isEmpty from 'lodash/fp/isEmpty'
import values from 'lodash/fp/values'
import keys from 'lodash/fp/keys'
import orderBy from 'lodash/fp/orderBy'
import reduce from 'lodash/fp/reduce'
import map from 'lodash/fp/map'
import forEach from 'lodash/fp/forEach'
import reject from 'lodash/fp/reject'
import unset from 'lodash/fp/unset'
import defer from 'lodash/fp/defer'

export default class EosBlocksStore {
  delay = 1000
  maxAmount = 100
  fetchAmount = 10
  timer = undefined
  @observable blocks = {}

  constructor(isServer, { delay, blocks = [] }) {
    this.blocks = {}
    this.delay = delay
  }

  @action start = flow(function*() {
    yield this.updateHeadBlock()
    this.timer = setTimeout(() => this.start(), this.delay)
  })

  @action updateHeadBlock = flow(function*() {
    try {
      const info = yield chain.getInfo()
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
      return yield this.fetchRange(headBlockNum, this.headBlockNum)
    }
  })

  @action fetchRange = (hi, lo) => {
    return Promise.all(map(blockNum => this.fetch(blockNum), range(lo, hi)))
  }

  @action fetch = flow(function*(blockNum) {
    try {
      const block = yield chain.getBlock(blockNum)
      this.blocks[block.block_num] = block
      this.addTransactions(block.transactions)
      return block
    } catch (e) {
      return console.warn(e)
    }
  })

  @action clearOldBlocks = () => {
    const lastAllowedBlockNum = this.headBlockNum - this.maxAmount
    if (this.tailBlockNum < lastAllowedBlockNum) {
      return map(
        blockNum => delete this.blocks[blockNum],
        range(this.tailBlockNum, lastAllowedBlockNum)
      )
    }
  }

  @computed get blockList() {
    return orderBy('block_num', 'desc', values(this.blocks))
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
    return reject(isNaN, map(parseInt, keys(this.blocks)))
  }

  stop = () => {
    clearTimeout(this.timer)
  }

  addTransactions = transactions => {
    if (transactions.length < 1) {
      return transactions
    }
    const store = getOrCreateStore()
    forEach(transaction => {
      defer(() => store.eosTransactions.add(transaction))
      return transaction
    }, transactions)
  }
}

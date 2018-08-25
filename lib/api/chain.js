import { nodeosFetch } from './helpers'
import { map, compose, values } from 'lodash'
import { BigNumber } from 'bignumber.js'

function chainApiFetch(url, data) {
  return nodeosFetch(`/v1/chain${url}`, data)
}

export function getInfo() {
  return chainApiFetch('/get_info')
}

export function getBlock(block_num_or_id) {
  return chainApiFetch('/get_block', { block_num_or_id })
}

export function getAccount(account_name) {
  return chainApiFetch('/get_account', { account_name })
}

export function getCode(account_name) {
  return chainApiFetch('/get_code', { account_name })
}

export async function getCurrencyBalance({ code, symbol, account }) {
  const amounts = await chainApiFetch('/get_currency_balance', {
    account,
    code,
    symbol
  })
  return compose(
    map(tuple => ({
      value: BigNumber(tuple[0]),
      amount: tuple[0],
      symbol: tuple[1]
    })),
    map(amount => amount.split(' '))
  )(amounts)[0]
}

export async function getCurrencyStats({ code, symbol }) {
  const stats = await chainApiFetch('/get_currency_stats', { code, symbol })
  return map(({ max_supply, supply, issuer }) => {
    const symbol = max_supply.split(' ')[1]
    const max_supply_amount = max_supply.split(' ')[0]
    const supply_amount = supply.split(' ')[0]
    return {
      symbol,
      issuer,
      max_supply_amount,
      supply_amount,
      max_supply_value: BigNumber(max_supply_amount),
      supply_value: BigNumber(supply_amount)
    }
  }, values(stats))[0]
}

export default {
  getInfo,
  getBlock,
  getAccount,
  getCode,
  getCurrencyBalance,
  getCurrencyStats
}

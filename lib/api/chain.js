import { nodeosFetch } from './helpers'

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

export default {
  getInfo,
  getBlock,
  getAccount
}

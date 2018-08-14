import { apiFetch } from './helpers'

function chainApiFetch(url, data) {
  return apiFetch(`/v1/chain${url}`, data)
}

export async function getInfo() {
  return await chainApiFetch('/get_info')
}

export async function getBlock(block_num_or_id) {
  return await chainApiFetch('/get_block', {
    block_num_or_id
  })
}

export default {
  getInfo,
  getBlock
}

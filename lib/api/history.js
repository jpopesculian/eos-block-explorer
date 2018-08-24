import { nodeosFetch } from './helpers'

function historyApiFetch(url, data) {
  return nodeosFetch(`/v1/history${url}`, data)
}

export function getTransaction(id) {
  return historyApiFetch('/get_transaction', { id })
}

export async function getKeyAccounts(public_key) {
  const response = await historyApiFetch('/get_key_accounts', { public_key })
  return response.account_names
}

export default {
  getTransaction,
  getKeyAccounts
}

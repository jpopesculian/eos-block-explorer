import { apiFetch } from './helpers'

function walletApiFetch(url, data) {
  return apiFetch(`/v1/wallet${url}`, data)
}

export function listWallets() {
  return walletApiFetch('/list_wallets')
}

export default {
  listWallets
}

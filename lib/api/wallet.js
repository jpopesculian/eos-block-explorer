import { keosFetch } from './helpers'
import map from 'lodash/fp/map'

function walletApiFetch(url, data) {
  return keosFetch(`/v1/wallet${url}`, data)
}

export function listWallets() {
  return walletApiFetch('/list_wallets')
}

export async function listKeys(name, password) {
  const keys = await walletApiFetch('/list_keys', [name, password])
  return map(key => ({ public_key: key[0], private_key: key[1] }), keys)
}

export function getPublicKeys() {
  return walletApiFetch('/get_public_keys')
}

export async function open(name) {
  await walletApiFetch('/open', name)
  return true
}

export async function unlock(name, password) {
  await walletApiFetch('/unlock', [name, password])
  return true
}

export default {
  listWallets,
  listKeys,
  getPublicKeys,
  unlock,
  open
}

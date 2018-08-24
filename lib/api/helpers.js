import { getOrCreateStore } from '../../store'
import merge from 'lodash/fp/merge'

const isServer = typeof window === 'undefined'

function getSettings() {
  return getOrCreateStore(isServer).eosSettings.apiConfig
}

async function apiFetch(url, data) {
  let options = { method: 'POST' }
  if (data) {
    options = merge(options, {
      body: JSON.stringify(data)
    })
  }
  // console.log(`API: ${url}`, options)
  const response = await fetch(`${url}`, options)
  return await response.json()
}

export function nodeosFetch(url, data) {
  const { nodeosEndpoint } = getSettings()
  return apiFetch(`${nodeosEndpoint}${url}`, data)
}

export function keosFetch(url, data) {
  const { keosEndpoint } = getSettings()
  return apiFetch(`${keosEndpoint}${url}`, data)
}

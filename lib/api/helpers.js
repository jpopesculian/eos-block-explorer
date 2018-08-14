import { getOrCreateStore } from '../../store'
import merge from 'lodash/fp/merge'

function getSettings() {
  return getOrCreateStore().eos_settings.apiConfig
}

export async function apiFetch(url, data) {
  const { httpEndpoint } = getSettings()
  let options = { method: 'POST' }
  if (data) {
    options = merge(options, {
      body: JSON.stringify(data)
    })
  }
  const response = await fetch(`${httpEndpoint}${url}`, options)
  return await response.json()
}

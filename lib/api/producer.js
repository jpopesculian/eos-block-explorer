import { nodeosFetch } from './helpers'

function producerApiFetch(url, data) {
  return nodeosFetch(`/v1/producer${url}`, data)
}

export async function pause() {
  const result = await producerApiFetch('/pause')
  return result.result == 'ok'
}

export async function resume() {
  const result = await producerApiFetch('/resume')
  return result.result == 'ok'
}

export function paused() {
  return producerApiFetch('/paused')
}

export default {
  pause,
  resume,
  paused
}

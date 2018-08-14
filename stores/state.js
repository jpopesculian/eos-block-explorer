export default function getInitialState() {
  return {
    clock: {
      lastUpdate: Date.now()
    },
    eos_settings: {
      host: 'localhost',
      port: 8888
    },
    eos_blocks: {
      delay: 1000,
      blocks: []
    }
  }
}

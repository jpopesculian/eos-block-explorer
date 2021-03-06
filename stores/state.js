export default function getInitialState() {
  return {
    clock: {
      lastUpdate: Date.now()
    },
    eosSettings: {
      nodeosHost: 'localhost',
      nodeosPort: 8888,
      keosHost: 'localhost',
      keosPort: 8900
    },
    eosBlocks: {
      delay: 250,
      blocks: []
    },
    eosWallets: {
      walletConfig: [
        {
          name: 'default',
          password: 'PW5JfL9xbnJydNHBXrwdV34jLrWyUdVMy6HJKTUmGEmq6w3TvvnAe'
        }
      ],
      wallets: []
    },
    eosAccounts: {
      accountNames: ['eosio']
    },
    eosTokens: {
      tokenConfig: [
        {
          symbol: 'SYS',
          code: 'eosio.token'
        }
      ]
    }
  }
}

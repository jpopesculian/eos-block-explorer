import App, { Container } from 'next/app'
import React from 'react'
import withMobxStore from '../lib/with-mobx-store'
import { Provider } from 'mobx-react'

import { pick } from 'lodash'

class MyApp extends App {
  render() {
    const { Component, pageProps, mobxStore } = this.props
    const stores = pick(
      [
        'eosProducer',
        'eosBlocks',
        'eosSettings',
        'eosWallets',
        'eosAccounts',
        'eosSmartContracts',
        'eosTokens'
      ],
      mobxStore
    )
    return (
      <Container>
        <Provider store={mobxStore} {...stores}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    )
  }
}

export default withMobxStore(MyApp)

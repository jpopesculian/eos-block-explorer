import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Layout from '../layouts/Main'
import BlockFetcher from './BlockFetcher'

@inject('store')
@observer
export default class Blocks extends Component {
  render() {
    const store = this.props.store.eosBlocks
    return (
      <Layout>
        <BlockFetcher
          start={store.start.bind(store)}
          stop={store.stop.bind(store)}
        />
      </Layout>
    )
  }
}

import React, { Component } from 'react'
import Meta from '../components/Meta'
import { inject, observer } from 'mobx-react'
import BlockFetcher from '../components/BlockFetcher'

@inject('store')
export default class MainLayout extends Component {
  render() {
    const store = this.props.store.eosBlocks
    return (
      <div>
        <Meta />
        <BlockFetcher
          start={store.start.bind(store)}
          stop={store.stop.bind(store)}
        />
        {this.props.children}
      </div>
    )
  }
}

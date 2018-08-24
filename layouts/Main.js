import React, { Component } from 'react'
import Meta from '../components/Meta'
import { inject, observer } from 'mobx-react'
import BlockFetcher from '../components/BlockFetcher'

export default class MainLayout extends Component {
  render() {
    return (
      <div>
        <Meta />
        <BlockFetcher />
        {this.props.children}
      </div>
    )
  }
}

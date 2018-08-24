import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Layout from '../layouts/Main'

@inject('eosBlocks')
export default class BlockFetcher extends Component {
  componentDidMount() {
    this.props.eosBlocks.start()
  }

  componentWillUnmount() {
    this.props.eosBlocks.stop()
  }
  render() {
    return null
  }
}

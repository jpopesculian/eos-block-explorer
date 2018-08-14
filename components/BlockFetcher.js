import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Layout from '../layouts/Main'

@inject('store')
@observer
export default class BlockFetcher extends Component {
  componentDidMount() {
    this.props.start()
  }

  componentWillUnmount() {
    this.props.stop()
  }
  render() {
    return null
  }
}

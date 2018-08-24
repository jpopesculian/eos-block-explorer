import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Layout from '../layouts/Navigation'

@inject('store')
@observer
export default class Blocks extends Component {
  render() {
    return <Layout name="blocks" />
  }
}

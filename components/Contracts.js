import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import Layout from '../layouts/Navigation'

@inject('store')
@observer
export default class Contracts extends Component {
  render() {
    return <Layout name="contracts" />
  }
}

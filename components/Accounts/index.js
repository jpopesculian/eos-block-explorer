import React, { Component } from 'react'
import Layout from '../../layouts/Navigation'
import List from './List'

export default class Accounts extends Component {
  render() {
    return (
      <Layout name="accounts">
        <List />
      </Layout>
    )
  }
}

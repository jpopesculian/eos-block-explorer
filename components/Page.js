import React from 'react'
import Link from 'next/link'
import { inject, observer } from 'mobx-react'
import Clock from './Clock'
import Layout from '../layouts/Main'

@inject('store')
@observer
class Page extends React.Component {
  componentDidMount() {
    this.props.store.clock.start()
  }

  componentWillUnmount() {
    this.props.store.clock.stop()
  }

  render() {
    return (
      <Layout>
        <h1>{this.props.title}</h1>
        <Clock
          lastUpdate={this.props.store.clock.lastUpdate}
          light={this.props.store.clock.light}
        />
        <nav>
          <Link href={this.props.linkTo}><a>Navigate</a></Link>
        </nav>
      </Layout>
    )
  }
}

export default Page

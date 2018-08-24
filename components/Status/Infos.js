import React, { Component } from 'react'
import Info from './Info'
import Running from './Running'
import { inject, observer } from 'mobx-react'

@inject('store')
@observer
export default class StatusInfos extends Component {
  render() {
    const blockStore = this.props.store.eosBlocks
    const producerStore = this.props.store.eosProducer
    return (
      <div className="tabs">
        <Info
          title="Head Block #"
          content={blockStore.headBlockNum > 0 ? blockStore.headBlockNum : '-'}
        />
        <Info
          title="Producer"
          content={!!blockStore.producer ? blockStore.producer : '-'}
        />
        <Info
          title="Status"
          content={
            <Running
              running={producerStore.running}
              toggle={producerStore.toggle.bind(producerStore)}
            />
          }
        />
        <style jsx>{`
      .tabs {
        width: 100%;
        display: flex;
        align-items: center;
      }
    `}</style>
      </div>
    )
  }
}

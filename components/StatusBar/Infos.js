import React, { Component } from 'react'
import Info from './Info'
import Running from './Running'
import { inject, observer } from 'mobx-react'

@inject('eosBlocks', 'eosSettings')
@observer
export default class StatusBarInfos extends Component {
  render() {
    const { eosBlocks, eosSettings } = this.props
    return (
      <div className="tabs">
        <Info
          title="Head Block #"
          content={eosBlocks.headBlockNum > 0 ? eosBlocks.headBlockNum : '-'}
        />
        <Info
          title="Producer"
          content={!!eosBlocks.producer ? eosBlocks.producer : '-'}
        />
        <Info title="nodeos" content={eosSettings.nodeosServer} />
        <Info title="keos" content={eosSettings.keosServer} />
        <Info title="Status" content={<Running />} />
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

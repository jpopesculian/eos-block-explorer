import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { PauseIcon, PlayIcon } from 'react-material-icon-svg'

@inject('eosProducer')
@observer
export default class StatusBarRunning extends Component {
  render() {
    const { eosProducer } = this.props
    const { running } = eosProducer

    if (running === undefined) {
      return <div>-</div>
    }
    return (
      <div className="running-status" onClick={() => eosProducer.toggle()}>
        <div className="icon">
          {running ? <PauseIcon /> : <PlayIcon />}
        </div>
        <div className="text">
          {running ? 'running' : 'paused'}
        </div>
        <style jsx>{`
          .running-status {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
          }

          .running-status:hover {
            cursor: pointer;
          }

          .text {
            padding-left: 0.5em;
          }

          .icon :global(svg) {
            width: 1em;
            height: auto;
            position: relative;
            top: 0.1em;
          }
        `}</style>
      </div>
    )
  }
}

import { PauseIcon, PlayIcon } from 'react-material-icon-svg'

export default ({ running, toggle }) => {
  if (running === undefined) {
    return <div>-</div>
  }
  return (
    <div className="running-status" onClick={toggle}>
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
        margin-top: 0.25em;
      }
    `}</style>
    </div>
  )
}

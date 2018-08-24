import Infos from './Infos'

export default () => (
  <div className="info-bar">
    <Infos />
    <style jsx>{`
      .info-bar {
        width: 100%;
        display: flex;
        min-height: 20px; // TODO remove
        background: #ddd;
      }
    `}</style>
  </div>
)

import Tabs from './Tabs'

export default ({ name }) => (
  <div className="tab-bar">
    <Tabs name={name} />
    <style jsx>{`
      .tab-bar {
        width: 100%;
        display: flex;
        min-height: 50px; // TODO remove
        background: #ccc;
      }
    `}</style>
  </div>
)

import {
  SettingsIcon,
  LayersIcon,
  AccountMultipleIcon,
  SyncIcon,
  CodeBracesIcon
} from 'react-material-icon-svg'
import Tab from './Tab'

export default ({ name }) => (
  <div className="tabs">
    <Tab
      title="Accounts"
      active={name == 'accounts'}
      Icon={AccountMultipleIcon}
      path={'/accounts'}
    />
    <Tab
      title="Transactions"
      active={name == 'transactions'}
      Icon={SyncIcon}
      path={'/transactions'}
    />
    <Tab
      title="Contracts"
      active={name == 'contracts'}
      Icon={CodeBracesIcon}
      path={'/contracts'}
    />
    <Tab
      title="Blocks"
      active={name == 'blocks'}
      Icon={LayersIcon}
      path={'/blocks'}
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

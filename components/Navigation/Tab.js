import Link from 'next/link'
import classnames from 'classnames'

export default ({ title, active, Icon, path }) => {
  return (
    <Link href={path}>
      <a className={classnames('tab', { active })}>
        <div className="icon">
          <Icon />
        </div>
        <div className="title">
          {title}
        </div>
        <style jsx>{`
      .tab {
        display: flex;
        padding: 0.5em 1em;
        align-items: center;
      }

      .title {
        text-transform: uppercase;
        padding-left: 0.5em;
        color: #333;
      }

      .tab.active .title {
        color: #fff;
      }

      .icon :global(svg) {
        margin-top: .1em;
        width: 2em;
        height: auto;
      }
    `}</style>
      </a>
    </Link>
  )
}

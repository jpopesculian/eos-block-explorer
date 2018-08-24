export default ({ title, content }) => {
  return (
    <div className="info">
      <div className="title">
        {title}
      </div>
      <div className="content">
        {content}
      </div>
      <style jsx>{`
      .title {
        text-transform: uppercase;
        font-size: .75em;
        line-height: 1;
      }

      .content {

      }

      .info {
        padding: 0.75em 1em;
      }
   `}</style>
    </div>
  )
}

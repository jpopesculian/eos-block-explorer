export default ({ children, label }) => (
  <div className="field">
    <div className="label">{label}</div>
    <div className="content">{children}</div>
    <style jsx>{`
      .field {
        padding: 0.5em 1em;
        border-bottom: 1px solid #CCC;
      }

      .label {
        padding-bottom: .5em;
        text-transform: uppercase;
        font-size: .75em;
      }

      .content {
      }
    `}</style>
  </div>
)

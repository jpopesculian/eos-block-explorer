export default ({ colNum, children }) => (
  <div className="table">
    {children}
    <style jsx>{`
      .table {
        display: grid;
        grid-template-columns: repeat(${colNum}, auto);
      }
    `}</style>
  </div>
)

export Row from './Row'
export Field from './Field'

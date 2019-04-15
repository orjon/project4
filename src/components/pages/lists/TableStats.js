import React from 'react'

const TableStats = (props) => {
  const totalDue = props.totalDue
  const totalOverdue = props.totalOverdue

  return (
    <div className = 'rowStats'>
      <div className = 'tableRow'>
        <div className = 'cellQuarterRight'>Total due:</div>
        <div className = 'cellCurrency'>£&thinsp;{totalDue && totalDue.toFixed(2)}</div>
      </div>
      <div className = 'tableRow'>
        <div className = 'cellQuarterRight'>of which overdue:</div>
        <div className = 'cellCurrency overdue'>
          £&thinsp;{(totalOverdue && totalOverdue.toFixed(2)) || '0.00'}
        </div>
      </div>
    </div>
  )
}

export default TableStats

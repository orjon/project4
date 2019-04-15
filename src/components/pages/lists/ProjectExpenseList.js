import React from 'react'

const ProjectExpenseList = (props) => {
  const expense = props.expense

  return (
    <div className = 'tableRow' >
      <div className = 'rowLeft'>
        <div className = 'cellDate'>{expense.date}</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>{expense.supplier.name}</div>
        <div className = 'cellHalf'>{expense.description}</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>£&thinsp;{expense.amount.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default ProjectExpenseList

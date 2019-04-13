import React from 'react'

const ExpensesList = (props) => {
  const expense = props.expense

  return (
    <div className = 'tableRow' >
      <div className = 'rowLeft'>
        <div className = 'cellDate'>{expense.date}</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellStringShort'>{expense.project.name}</div>
        <div className = 'cellStringShort'>{expense.supplier.name}</div>
        <div className = 'cellStringLong'>{expense.description}</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>{expense.amount.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default ExpensesList

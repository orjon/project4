import React from 'react'
import { Link } from 'react-router-dom'

const ExpenseList = (props) => {
  const expense = props.expense

  return (
    <div className= 'tableRow' >
      <div className= 'rowLeft'>
        <div className= 'cellDate'>{expense.date}</div>
      </div>
      <div className='rowCentre'>
        <Link to={expense.project && `/project/${expense.project.id}`} className='cellCode cell'>
          {(expense.project && expense.project.code) || 'UNASSIGNED'}
        </Link>
        <Link to={expense.project && `/project/${expense.project.id}`} className='cellQuarter cell'>
          {(expense.project && expense.project.name) || 'UNASSIGNED'}
        </Link>
        <div className='cellQuarter'>
          {(expense.supplier && expense.supplier.name) || 'UNASSIGNED'}
        </div>
        <div className='cellHalf'>{expense.description}</div>
      </div>
      <div className = 'rowRight'>
        <div className ='cellDateRight'>£&thinsp;{expense.amount.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default ExpenseList

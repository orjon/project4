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
        <Link to={expense.project && `/project/${expense.project.id}`} className='cellThird cell'>
          {(expense.project && expense.project.name) || 'UNASSIGNED'}
        </Link>
        <div className='cellThird'>
          {(expense.supplier && expense.supplier.name) || 'UNASSIGNED'}
        </div>

        <Link to={expense.project && `/expenses/${expense.id}`} className='cellThird cell'>
          {expense.description}
        </Link>

      </div>
      <div className = 'rowRight'>
        <div className ='cellDateRight'>£&thinsp;{expense.amount.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default ExpenseList

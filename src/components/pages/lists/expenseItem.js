import React from 'react'
import { Link } from 'react-router-dom'

const ExpenseItem = (props) => {
  const { expense } = props
  return (
    <div className = 'tableRow' >
      <div className = 'rowLeft'>

        <Link to={expense.project && `/expenses/${expense.id}`}
          className='cellDate cell'>
          {expense.date}
        </Link>

      </div>
      <div className = 'rowCentre'>
        <Link to={expense.project && `/project/${expense.project.id}`}
          className='cellCode cell'>
          {(expense.project && expense.project.code) || 'UNASSIGNED'}
        </Link>

        <Link to={expense.project && `/project/${expense.project.id}`}
          className='cellThird cell'>
          {(expense.project && expense.project.name) || 'UNASSIGNED'}
        </Link>

        <Link to={expense.supplier && `/supplier/${expense.supplier.id}`}
          className='cellThird cell'>
          {(expense.supplier && expense.supplier.name) || 'UNASSIGNED'}
        </Link>

        <Link to={expense.project && `/expenses/${expense.id}`}
          className='cellThird cell'>
          {(expense.project && expense.description)}
        </Link>
      </div>

      <div className = 'rowRight'>

        <Link to={expense.project && `/expenses/${expense.id}`}
          className='cellDateRight cell'>
          £&thinsp;{expense.amount ? expense.amount.toFixed(2) : 0}
        </Link>

      </div>

    </div>
  )
}

export default ExpenseItem

import React from 'react'
import { Link } from 'react-router-dom'

const SupplierList = (props) => {
  const supplier = props.supplier

  return (
    <div className = 'tableRow' >
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>{supplier.name}</div>
        <div className = 'cellQuarter'>
          {supplier.expenses && supplier.expenses.map(expense => (
            <Link to={`/project/${expense.project.id}`} key={expense.id} className='cell'>
              <div>{expense.project.client.name}</div>
            </Link>
          ))}
        </div>
        <div className = 'cellCode'>
          {supplier.expenses && supplier.expenses.map(expense => (
            <Link to={`/project/${expense.project.id}`} key={expense.id} className="cell">
              <div>{expense.project.code}</div>
            </Link>
          ))}
        </div>
        <div className = 'cellQuarter'>
          {supplier.expenses && supplier.expenses.map(expense => (
            <Link to={`/project/${expense.project.id}`} key={expense.id} className='cell'>
              <div>{expense.project.name}</div>
            </Link>
          ))}
        </div>
        <div className = 'cellQuarter'>
          {supplier.expenses && supplier.expenses.map(expense => (
            <div key={expense.id}>
              <div>{expense.description}</div>
            </div>
          ))}
        </div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>
          {supplier.expenses && supplier.expenses.map(expense => (
            <div key={expense.id}>
              <div>£&thinsp;{expense.amount.toFixed(2)}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SupplierList

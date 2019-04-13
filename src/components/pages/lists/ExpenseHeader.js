import React from 'react'

const ExpenseHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'>date</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>project</div>
        <div className = 'cellQuarter'>supplier</div>
        <div className = 'cellHalf'>description</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>amount</div>
      </div>
    </div>
  )
}

export default ExpenseHeader

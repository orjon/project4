import React from 'react'

const ExpenseHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'>date</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellCode'>code</div>
        <div className = 'cellThird'>project</div>
        <div className = 'cellThird'>supplier</div>
        <div className = 'cellThird'>description</div>
      </div>
      <div className = 'rowRight'>
        <div className ='cellDateRight'>amount</div>
      </div>
    </div>
  )
}

export default ExpenseHeader

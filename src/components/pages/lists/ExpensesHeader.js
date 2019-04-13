import React from 'react'

const InvoiceHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'>date</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellStringShort'>project</div>
        <div className = 'cellStringShort'>supplier</div>
        <div className = 'cellStringLong'>description</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>amount</div>
      </div>
    </div>
  )
}

export default InvoiceHeader

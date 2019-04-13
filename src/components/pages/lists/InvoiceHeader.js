import React from 'react'

const InvoiceHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'>issued</div>
        <div className = 'cellDate'>due</div>
        <div className = 'cellCode'>no.</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellStringShort'>client</div>
        <div className = 'cellStringShort'>project</div>
        <div className = 'cellStringLong'>description</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>amount</div>
      </div>
    </div>
  )
}

export default InvoiceHeader

import React from 'react'

const InvoiceHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'>issued</div>
        <div className = 'cellDate'>due</div>
        <div className = 'cellDate'>paid</div>
        <div className = 'cellCode'>no.</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>project</div>
        <div className = 'cellQuarter'>client</div>
        <div className = 'cellHalf'>description</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>amount</div>
      </div>
    </div>
  )
}

export default InvoiceHeader

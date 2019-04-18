import React from 'react'

const InvoiceHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'>issued</div>
        <div className = 'cellDate'>due</div>
        <div className = 'cellDate'>paid</div>

      </div>
      <div className = 'rowCentre'>
        <div className = 'cellCode'>code</div>
        <div className = 'cellThird'>project</div>
        <div className = 'cellThird'>client</div>
        <div className = 'cellThird'>description</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>amount</div>
      </div>
    </div>
  )
}

export default InvoiceHeader

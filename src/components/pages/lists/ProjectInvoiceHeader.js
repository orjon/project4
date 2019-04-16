import React from 'react'

const ProejctInvoiceHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'>issued</div>
        <div className = 'cellDate'>due</div>
        <div className = 'cellCode'>inv no.</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellHalf'>description</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>amount</div>
      </div>
    </div>
  )
}

export default ProejctInvoiceHeader

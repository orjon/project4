import React from 'react'

const ClientHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>client</div>
        <div className = 'cellCode'>code</div>
        <div className = 'cellQuarter'>projects</div>
        <div className = 'cellQuarterRight'>expenses</div>
        <div className = 'cellCurrency'>amount</div>
        <div className='cellComparator'>
          <div className='lineItem summary'>
            <div>&#32;</div>
          </div>
        </div>
        <div className = 'cellCodeRight'>invoices</div>
        <div className = 'cellCurrency'>amount</div>
      </div>
    </div>
  )
}

export default ClientHeader

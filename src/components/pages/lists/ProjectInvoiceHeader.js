import React from 'react'
import { Link } from 'react-router-dom'

const ProejctInvoiceHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'><Link to='/invoices' className='cell'>issued</Link></div>
        <div className = 'cellDate'><Link to='/invoices' className='cell'>due</Link></div>
        <div className = 'cellCode'><Link to='/invoices' className='cell'>inv no.</Link></div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellHalf'><Link to='/invoices' className='cell'>description</Link></div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'><Link to='/invoices' className='cell'>amount</Link></div>
      </div>
    </div>
  )
}

export default ProejctInvoiceHeader

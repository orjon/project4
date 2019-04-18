import React from 'react'
import { Link } from 'react-router-dom'

const InvoiceHeader = () => {

  return (
    <div className='rowHeader'>
      <div className='rowLeft'>
        <div className='cellCode'><Link to='/invoices' className='cell'>inv no.</Link></div>
        <div className='cellDate'><Link to='/invoices' className='cell'>issued</Link></div>
        <div className='cellDate'><Link to='/invoices' className='cell'>due</Link></div>

      </div>
      <div className='rowCentre'>
        <div className='cellCode'><Link to='/invoices' className='cell'>code</Link></div>
        <div className='cellThird'><Link to='/projects' className='cell'>project</Link></div>
        <div className='cellThird'><Link to='/clients' className='cell'>client</Link></div>
        <div className='cellThird'><Link to='/invoices' className='cell'>description</Link></div>
      </div>
      <div className='rowRight'>
        <div className='cellCurrency'><Link to='/invoices' className='cell'>amount</Link></div>
      </div>
    </div>
  )
}

export default InvoiceHeader

import React from 'react'
import { Link } from 'react-router-dom'

const SupplierHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'><Link to='./suppliers' className='cell'>supplier</Link></div>
        <div className = 'cellCode'><Link to='./projects' className='cell'>code</Link></div>
        <div className = 'cellQuarter'><Link to='./projects' className='cell'>project</Link></div>
        <div className = 'cellQuarter'><Link to='./clients' className='cell'>client</Link></div>
        <div className = 'cellQuarter'><Link to='./expenses' className='cell'>description</Link></div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'><Link to='./expenses' className='cell'>amount</Link></div>
      </div>
    </div>
  )
}

export default SupplierHeader

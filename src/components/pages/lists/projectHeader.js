import React from 'react'
import { Link } from 'react-router-dom'

const ProjectHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellCode'>
          <Link to="/projects" className='headerLink'>
            codes
          </Link>
        </div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>
          <Link to="/projects" className='headerLink'>
            projects
          </Link>
        </div>
        <div className = 'cellQuarter'>
          <Link to="/clients" className='headerLink'>
            client
          </Link>
        </div>
        <div className = 'cellQuarterRight'>
          <Link to="/expenses" className='headerLink'>
            expenses
          </Link>
        </div>
        <div className = 'cellCurrency'>
          <Link to="/expenses" className='headerLink'>
            amount
          </Link>
        </div>
        <div className='cellComparator'>
          <div className='lineItem summary'>
            <div>&#32;</div>
          </div>
        </div>
        <div className = 'cellCodeRight'>
          <Link to="/invoices" className='headerLink'>
            invoices
          </Link>
        </div>
        <div className = 'cellCurrency'>
          <Link to="/invoices" className='headerLink'>
            amount
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProjectHeader

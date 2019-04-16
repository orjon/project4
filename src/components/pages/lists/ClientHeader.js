import React from 'react'
import { Link } from 'react-router-dom'

const ClientHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'>client</div>
        <div className = 'cellCurrency'></div>
        <div className = 'cellCode'>
          <Link to="/projects" className='headerLink'>
            codes
          </Link>
        </div>
        <div className = 'cellQuarter'>
          <Link to="/projects" className='headerLink'>
            projects
          </Link>
        </div>
        <div className = 'cellQuarterRight'></div>
        <div className='cellComparator'></div>
        <div className = 'cellCodeRight'></div>
        <div className = 'cellCurrency'></div>
      </div>
    </div>
  )
}

export default ClientHeader

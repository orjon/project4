import React from 'react'
import { Link } from 'react-router-dom'

const ProjectExpenseHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'><Link to='/expenses' className='cell'>date</Link></div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellQuarter'><Link to='/suppliers' className='cell'>supplier</Link></div>
        <div className = 'cellHalf'><Link to='/expenses' className='cell'>description</Link></div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'><Link to='/expenses' className='cell'>amount</Link></div>
      </div>
    </div>
  )
}

export default ProjectExpenseHeader

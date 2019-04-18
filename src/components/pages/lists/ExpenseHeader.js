import React from 'react'
import { Link } from 'react-router-dom'

const ExpenseHeader = () => {

  return (
    <div className = 'rowHeader'>
      <div className = 'rowLeft'>
        <div className = 'cellDate'>
          <Link to='/expenses' className='cell'>
            date
          </Link>
        </div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellCode'>
          <Link to='/projects' className='cell'>
            code
          </Link>
        </div>
        <div className = 'cellThird'>
          <Link to='/projects' className='cell'>
            project
          </Link>
        </div>
        <div className = 'cellThird'>
          <Link to='/suppliers' className='cell'>
            supplier
          </Link>
        </div>
        <div className = 'cellThird'>
          <Link to='/expenses' className='cell'>
            description
          </Link>
        </div>
      </div>
      <div className = 'rowRight'>
        <div className ='cellDateRight'>
          <Link to='/expenses' className='cell'>
            amount
          </Link>
        </div>
      </div>
    </div>

  )
}

export default ExpenseHeader

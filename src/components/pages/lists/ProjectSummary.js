import React from 'react'
import { Link } from 'react-router-dom'



const ProjectSummary = (props) => {
  const totalExpenses=props.totalExpenses
  const totalInvoiced=props.totalInvoiced
  const sign = Math.sign(totalInvoiced-totalExpenses)
  const comparator=props.comparator

  return (
    <div className='tableRow'>
      <div className='rowLeft'>
        <div className='cellCode'>

        </div>
      </div>
      <div className='rowCentre'>
        <div className='cellQuarter'>

        </div>
        <div className='cellQuarter'>

        </div>
        <div className='cellQuarterRight'>
          <div className='lineItem summary'>
            <div>Total:</div>
          </div>
        </div>
        <div className='cellCurrency'>
          <div className='lineItem summary'>
            <div>£&thinsp;{totalExpenses.toFixed(2) || '0.00'}</div>
          </div>
        </div>
        <div className='cellComparator'>
          <div className='summary'>
            <div className={`${sign>0 ? 'positive' : 'negative' }
              ${sign===0 ? 'equal' : ''} `}>
              {comparator}
            </div>
          </div>
        </div>
        <div className='cellCodeRight'>
          <div className='lineItem summary'>
            <div>Total:</div>
          </div>
        </div>
        <div className='cellCurrency'>
          <div className='lineItem summary'>
            <div>£&thinsp;{totalInvoiced.toFixed(2) || '0.00'}</div>
            <div>&thinsp;</div>
          </div>
        </div>
      </div>
    </div>
  )
}





export default ProjectSummary

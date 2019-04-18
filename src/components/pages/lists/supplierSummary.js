import React from 'react'


const SupplierSummary = (props) => {
  const totalExpenses=props.totalExpenses


  return (
    <div className='tableRow'>
      <div className='rowLeft'>
        <div className='cellCode'>

        </div>
      </div>
      <div className='rowCentre'>

        <div className='cellQuarter'></div>
        <div className='cellQuarter'></div>
        <div className='cellQuarterRight'></div>
        <div className='cellCurrency'></div>
        <div className='cellComparator'></div>

        <div className='cellQuarterRight'>
          <div className='lineItem summary'>
            <div>Total:</div>
          </div>
        </div>
        <div className='cellCurrency'>
          <div className='lineItem summary'>
            <div>£&thinsp;{totalExpenses.toFixed(2) || '0.00'}</div>
            <div>&thinsp;</div>
          </div>
        </div>
      </div>
    </div>
  )
}





export default SupplierSummary

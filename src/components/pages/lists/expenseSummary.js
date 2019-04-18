import React from 'react'


const ExpenseSummary = (props) => {
  const totalExpenses=props.totalExpenses

  return (
    <div className='tableRow'>
      <div className='rowLeft'>
        <div className='cellCode'></div>
      </div>
      <div className='rowCentre'>
        <div className='cellQuarter'></div>
        <div className='cellQuarter'></div>
        <div className='cellQuarterRight'></div>
        <div className='cellCurrency'>

        </div>
        <div className='cellComparator'>
        </div>
        <div className='cellQuarterRight'>
          <div className='lineItem summary'>
            <div>total due</div>
          </div>
        </div>
        <div className='cellCurrency'>
          <div className='lineItem summary'>
            <div className='tableLastRow'>
              £&thinsp;{totalExpenses && totalExpenses.toFixed(2)}</div>
          </div>
        </div>
      </div>
    </div>

  )
}




export default ExpenseSummary

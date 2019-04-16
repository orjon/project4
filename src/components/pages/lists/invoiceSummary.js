import React from 'react'


const InvoiceSummary = (props) => {
  const totalDue=props.totalDue
  const totalOverdue=props.totalOverdue

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
            <div>of which overdue</div>

          </div>
        </div>
        <div className='cellCurrency'>
          <div className='lineItem summary'>
            <div>
              £&thinsp;{totalDue && totalDue.toFixed(2)}</div>
            <div className={`lineItem ${totalOverdue ? 'overdue':''}`}>
              £&thinsp;{(totalOverdue && totalOverdue.toFixed(2)) || '0.00'}</div>
          </div>
        </div>
      </div>
    </div>

  )
}




export default InvoiceSummary

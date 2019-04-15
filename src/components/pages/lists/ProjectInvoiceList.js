import React from 'react'

const ProjectInvoiceList = (props) => {
  const invoice = props.invoice

  return (
    <div className = 'tableRow' >
      <div className = 'rowLeft'>
        <div className = 'cellDate'>{invoice.date_issued}</div>
        <div className = 'cellDate'>{invoice.date_paid ? 'PAID' : invoice.date_due}</div>
        <div className = 'cellCode'>{invoice.number}</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellHalf'>{invoice.description}</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>£&thinsp;{invoice.amount.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default ProjectInvoiceList

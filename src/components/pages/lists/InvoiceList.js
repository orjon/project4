import React from 'react'

const InvoiceList = (props) => {
  const invoice = props.invoice

  return (
    <div className = 'tableRow' >
      <div className = 'rowLeft'>
        <div className = 'cellDate'>{invoice.date_issued}</div>
        <div className = 'cellDate'>{invoice.date_due}</div>
        <div className = 'cellCode'>{invoice.number}</div>
      </div>
      <div className = 'rowCentre'>
        <div className = 'cellStringShort'>{invoice.client.name}</div>
        <div className = 'cellStringShort'>{invoice.project.name}</div>
        <div className = 'cellStringLong'>{invoice.description}</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>{invoice.amount}</div>
      </div>
    </div>
  )
}

export default InvoiceList

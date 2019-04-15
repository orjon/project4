import React from 'react'
import { Link } from 'react-router-dom'

const InvoiceList = (props) => {
  const invoice = props.invoice
  const overdue= props.overdue
  const paid = props.paid

  return (
    <div className = 'tableRow' >
      <div className = 'rowLeft'>
        <div className = 'cellDate'>{invoice.date_issued}</div>
        <div className = 'cellDate'>{invoice.date_paid ? 'RECEIVED' : invoice.date_due}</div>
        <div className = 'cellCode'>{invoice.number}</div>
      </div>
      <div className = 'rowCentre'>
        <Link to={invoice.project && `/project/${invoice.project.id}`}
          className={`cellQuarter cell
            ${overdue && !paid ? 'overdue':''}
            ${paid ? 'paid':''}
          `}>
          {(invoice.project && invoice.project.name) || 'UNASSIGNED'}
        </Link>
        <div className = 'cellQuarter'>{(invoice.client && invoice.client.name) || 'UNASSIGNED'}</div>
        <div className = 'cellHalf'>{invoice.description}</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>£&thinsp;{invoice.amount.toFixed(2)}</div>
      </div>
    </div>
  )
}

export default InvoiceList


// <div className = 'cellDate'>{invoice.date_due}</div>
// <div className = 'cellDate'>{invoice.date_paid}</div>

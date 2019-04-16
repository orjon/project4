import React from 'react'
import { Link } from 'react-router-dom'

const InvoiceItem = (props) => {
  const { invoice, overdue, paid } = props
  return (
    <div className = 'tableRow' >
      <div className = 'rowLeft'>
        <div className = 'cellDate'>{invoice.date_issued}</div>
        <div className = 'cellDate'>{invoice.date_due}</div>
        <div className = 'cellDate'>{invoice.date_paid ? invoice.date_paid : 'NOT PAID'}</div>
      </div>
      <div className = 'rowCentre'>
        <Link to={invoice.project && `/project/${invoice.project.id}`}
          className={`cellCode cell
            ${overdue && !paid ? 'overdue':''}
            ${paid ? 'paid':''}
          `}>
          {(invoice.project && invoice.project.code) || 'UNASSIGNED'}
        </Link>
        <Link to={invoice.project && `/project/${invoice.project.id}`}
          className={`cellThird cell
            ${overdue && !paid ? 'overdue':''}
            ${paid ? 'paid':''}
          `}>
          {(invoice.project && invoice.project.name) || 'UNASSIGNED'}
        </Link>
        <div className = 'cellThird'>
          {(invoice.client && invoice.client.name) || 'UNASSIGNED'}
        </div>
        <div className = 'cellThird'>{invoice.description}</div>
      </div>
      <div className = 'rowRight'>
        <div className = 'cellCurrency'>£&thinsp;
          {invoice.amount.toFixed(2)}
        </div>
      </div>
    </div>
  )
}

export default InvoiceItem

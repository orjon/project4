import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'


const InvoiceList = (props) => {
  const invoice = props.invoice
  const today = props.today

  return (
    <div className = 'tableRow' >
      <div className = 'rowLeft'>
        <div className = 'cellDate'>{invoice.date_issued}</div>
        <div className = {`cellDate
          ${(today > moment(invoice.date_due)) ? 'overdue':''}
          ${(invoice.date_paid) ? 'paid':''}`}>{invoice.date_paid ? 'RECEIVED' : invoice.date_due}</div>
        <div className = 'cellCode'>{invoice.number}</div>
      </div>
      <div className = 'rowCentre'>
        <Link to={invoice.project && `/project/${invoice.project.id}`} className='cellQuarter cell'>
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

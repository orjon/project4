import React from 'react'
import { Link } from 'react-router-dom'

const InvoiceList = (props) => {
  const invoice = props.invoice
  const overdue= props.overdue
  const paid = props.paid

  return (
    <div className = 'tableRow' >
      <div className = 'rowLeft'>
        <Link to={invoice.project && `/invoice/${invoice.id}`}
          className={`cellCode cell
            ${overdue && !paid ? 'overdue':''}
            ${paid ? 'paid':''}
          `}>
          {invoice.number}
        </Link>

        <Link to={invoice.project && `/invoice/${invoice.id}`}
          className={`cellCode cell
            ${overdue && !paid ? 'overdue':''}
            ${paid ? 'paid':''}
          `}>
          {invoice.date_issued}
        </Link>

        <Link to={invoice.project && `/invoice/${invoice.id}`}
          className={`cellCode cell
            ${overdue && !paid ? 'overdue':''}
            ${paid ? 'paid':''}
          `}>
          {invoice.date_issued}
        </Link>

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

        <Link to={invoice.client && `/client/${invoice.client.id}`}
          className={`cellThird cell
            ${overdue && !paid ? 'overdue':''}
            ${paid ? 'paid':''}
          `}>
          {(invoice.client && invoice.client.name) || 'UNASSIGNED'}
        </Link>


        <Link to={invoice.project && `/invoice/${invoice.id}`}
          className={`cellThird cell
            ${overdue && !paid ? 'overdue':''}
            ${paid ? 'paid':''}
          `}>
          {invoice.description}
        </Link>

      </div>
      <div className = 'rowRight'>

        <Link to={invoice.project && `/invoice/${invoice.id}`}
          className={`cellCurrency cell
            ${overdue && !paid ? 'overdue':''}
            ${paid ? 'paid':''}
          `}>
          £&thinsp;{invoice.amount.toFixed(2)}
        </Link>



      </div>
    </div>
  )
}

export default InvoiceList

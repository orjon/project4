import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import axios from 'axios'
import Auth from '../../../lib/auth'



export class InvoiceList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      project: {
        code: '',
        name: ''
      },
      client_id: '',
      error: '',
      modalShow: false
    }
    this.today = moment()
    this.userCurrent = ''
    this.test = props.test
    this.invoice = props.invoice
    this.overdue=props.overdue
    this.paid=props.paid

    this.handleUpdate=props.handleUpdate
    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete(e) {
    console.log('deleting')
    confirm('hello')
    e.preventDefault()
    axios.delete(`/api/invoices/${this.invoice.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.props.history.push('/invoices')

      })
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })

  }





  render() {
    return (
      <div className = 'tableRow' >
        <div className = 'rowLeft'>
          <div className = 'columns iconsTitle'>
            <div className= 'icons'>

              <button className='icon' onClick={this.handleEdit}>
                <img alt='edit'
                  src='http://www.orjon.com/dev/project4/iconEditUp.png'
                  width='20'
                  height='20' />
              </button>
            </div>
            <div className= 'icons'>
              <button className='icon' onClick={this.handleDelete}>
                <img alt='edit'
                  src='http://www.orjon.com/dev/project4/iconDeleteUp.png'
                  width='20'
                  height='20' />
              </button>
            </div>
          </div>
          <div className = 'columns'>
            <div className = 'cellDate'>{this.invoice.date_issued}</div>
            <div className = 'cellDate'>{this.invoice.date_paid ? 'RECEIVED' : this.invoice.date_due}</div>
            <div className = 'cellCode'>{this.invoice.number}</div>
          </div>
        </div>
        <div className = 'rowCentre'>
          <Link to={this.invoice.project && `/project/${this.invoice.project.id}`}
            className={`cellQuarter cell
              ${this.overdue && !this.paid ? 'overdue':''}
              ${this.paid ? 'paid':''}
            `}>
            {(this.invoice.project && this.invoice.project.name) || 'UNASSIGNED'}
          </Link>
          <div className = 'cellQuarter'>{(this.invoice.client && this.invoice.client.name) || 'UNASSIGNED'}</div>
          <div className = 'cellHalf'>{this.invoice.description}</div>
        </div>
        <div className = 'rowRight'>
          <div className = 'cellCurrency'>£&thinsp;{this.invoice.amount.toFixed(2)}</div>
        </div>
      </div>
    )
  }
}

export default InvoiceList

//
//
//
//
// const InvoiceList = (props) => {
//   const invoice = props.invoice
//   const overdue= props.overdue
//   const paid = props.paid
//   const test = props.test
//   const handleDelete = props.handleDelete



// <div><img src={ require('../../../../assets/icons/iconDeleteCircle.jpg') } /></div>

// <div className = 'cellDate'>{invoice.date_due}</div>
// <div className = 'cellDate'>{invoice.date_paid}</div>

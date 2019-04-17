import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import InvoiceItem from './lists/invoiceItem'
import InvoiceItemHeader from './lists/invoiceItemHeader'
import ModalInvoiceUpdate from './modals/invoiceUpdate'
import TableStats from './lists/tableStats'
import moment from 'moment'


class InvoiceShow extends React.Component {
  constructor() {
    super()
    this.state = {
      invoice: {
        number: '',
        amount: 0,
        project_id: ''
      },
      error: '',
      modalShow: false
    }
    this.today = moment()
    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.invoice = ''
  }

  handleClose() {
    this.setState({ modalShow: false }, this.getData())
  }


  handleShow() {
    this.setState({ modalShow: true })
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/invoices', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getData())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }


  handleDelete(e) {
    e.preventDefault()
    axios.delete(`/api/invoices/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.props.history.push('/invoices')

      })
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }


  getData() {
    axios.get(`/api/invoice/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => {
        this.setState({ invoice: res.data })
      })
      .then(() => this.invoice = this.state.invoice)
      .then(() => this.setState({ client_id: this.state.invoice.client.id}))
      // .catch(err => this.setState({errors: err.response.data.errors}))
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)
      .then(() => this.getData())

  }


  checkOverdue(invoice) {
    return this.today > moment(invoice.date_due)
  }

  checkPaid(invoice) {
    return invoice.date_paid
  }

  sumArray(array) {
    const length = array.length
    let sum = 0
    for (let i=0; i<length; i++) {
      sum += array[i].amount
    }
    return sum
  }

  render() {
    const modalClose = () => {
      this.setState({ modalShow: false })
      this.getData()
    }

    const invoice = this.state.invoice
    const overdue = this.checkOverdue(invoice)
    const paid = this.checkPaid(invoice)


    return (
      <main className="section">
        <div className="subHeader2 columns">
          <div><Link to="/invoices" className='headerLink'>Invoice</Link><span> : {this.state.invoice.number}</span></div>
          <div className='columns'>
            <div className='subHeader2Label'></div>
            <div className='subHeader2Currency'>£&thinsp;{invoice && invoice.amount.toFixed(2)}</div>
          </div>
        </div>

        <div className = 'dataTable'>
          <InvoiceItemHeader />
          <div className='lineItem'>
            <InvoiceItem invoice={invoice} overdue={overdue} paid={paid}/>
          </div>
        </div>
        
        <div className = 'columns icons'>
          <div className= 'icons'>
            <button className='icon' onClick={this.handleShow}>
              <img alt='edit'
                src='http://www.orjon.com/dev/project4/iconEditCircle.png'
                width='25'
                height='25' />
            </button>
          </div>
          <div className= 'icons'>
            <button className='icon' onClick={this.handleDelete}>
              <img alt='edit'
                src='http://www.orjon.com/dev/project4/iconDeleteCircle.png'
                width='25'
                height='25' />
            </button>
          </div>
        </div>

        <ModalInvoiceUpdate
          overdue={overdue}
          paid={paid}
          show={this.state.modalShow}
          error={this.state.error}
          onHide={modalClose}
          client_id={this.state.client_id}
          id={this.props.match.params.id}
          number={this.state.invoice.number}
          amount={this.state.invoice.amount}
          closeModal={this.handleClose}
        />
      </main>
    )
  }
}

export default InvoiceShow

import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import SupplierItem from './lists/supplierItem'
import SupplierHeader from './lists/supplierHeader'
import ModalInvoiceUpdate from './modals/invoiceUpdate'
import moment from 'moment'

class SupplierShow extends React.Component {
  constructor() {
    super()
    this.state = {
      client: {
        name: ''
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
    axios.post('/api/suppliers', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getData())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }


  handleDelete(e) {
    if (window.confirm('Are you sure you want to do this?')) {
      e.preventDefault()
      axios.delete(`/api/suppliers/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
        .then(() => {
          this.props.history.push('/invoices')

        })
        .catch((err) => {
          console.log('the error is', err)
          this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
        })
    }
  }


  getData() {
    axios.get(`/api/suppliers/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => {
        this.setState({ supplier: res.data })
        console.log(this.state.client.id)
      })

      // .then(() => this.client = this.state.invoice)
      // .then(() => this.setState({ client_id: this.state.invoice.client.id}))
      .catch(err => this.setState({errors: err.response.data.errors}))
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

    const client= this.state.client



    return (
      <main className="section">
        <div className="subHeader2">
          <Link to='/clients' className='cellQuarter cell'>
            Suppliers</Link> : {this.state.client.name}</div>
        <div className = 'dataTable'>

          <SupplierHeader />
          <div className="lineItem">
            <SupplierItem
              client={client}
            />
            <div className="tableRow">&nbsp;</div>
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
          show={this.state.modalShow}
          error={this.state.error}
          onHide={modalClose}
          client_id={this.props.match.params.id}
        />
      </main>
    )
  }
}

export default SupplierShow

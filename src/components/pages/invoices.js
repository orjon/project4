import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import moment from 'moment'
import InvoiceList from './lists/invoiceList'
import InvoiceHeader from './lists/invoiceHeader'
import TableStats from './lists/tableStats'
import ModalInvoiceAdd from './modals/invoiceAdd'

class Invoices extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        number: '',
        amount: '',
        project_id: ''
      },
      error: '',
      modalAddShow: false,
      modalUpdateShow: false
    }
    this.today = moment()
    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleAddShow = this.handleAddShow.bind(this)
    this.handleAddClose = this.handleAddClose.bind(this)

    this.handleUpdateShow = this.handleUpdateShow.bind(this)
    this.handleUpdateClose = this.handleUpdateClose.bind(this)
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)
  }

  handleAddClose() {
    this.setState({ modalAddShow: false })
  }

  handleAddShow() {
    this.setState({ modalAddShow: true })
  }

  handleUpdateClose() {
    this.setState({ modalUpdateShow: false })
  }

  handleUpdateShow() {
    this.setState({ modalUpdateShow: true })
  }


  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  handleChangeDropDown({ target: { value }}) {
    const [ project, client ] = value.split('-')
    const data = {...this.state.data, project_id: project, client_id: client }
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


  getData() {
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({
        invoices: res.data.invoices
      }))
      .catch(err => console.log(err))
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

  sumDue(array) {
    const length = array.length
    let sum = 0
    for (let i=0; i<length; i++) {
      if (!(array[i].date_paid)) {
        sum += array[i].amount
      }
    }
    return sum
  }

  sumOverdue(array) {
    const length = array.length
    let sum = 0
    for (let i=0; i<length; i++) {
      if (!(array[i].date_paid) && (this.today > moment(array[i].date_due))) {
        sum += array[i].amount
      }
    }
    return sum
  }


  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)
      .then(() => this.getData())
  }

  render() {
    const modalClose = () => {
      this.setState({ modalAddShow: false })
      this.getData()
    }

    const totalDue = this.state.invoices && this.sumDue(this.state.invoices)
    const totalOverdue= this.state.invoices && this.sumOverdue(this.state.invoices)

    return (
      <main className='section'>
        <div className='subHeader2 columns'>
          <div>Invoices</div>
          <div className='columns'>
            <div className='subHeader2Label'>Total invoiced:</div>
            <div className='subHeader2Currency'>£&thinsp;{this.state.invoices && this.sumArray(this.state.invoices).toFixed(2)}</div>
          </div>
        </div>

        <div className = 'statsTable'>
          <TableStats totalDue={totalDue} totalOverdue={totalOverdue}/>
        </div>
        <div className = 'dataTable'>
          <InvoiceHeader />
          {this.state.invoices && this.state.invoices.map(invoice => (
            <div key={invoice.id}
              className={`lineItem
                ${this.checkOverdue(invoice) ? 'overdue':''}
                ${this.checkPaid(invoice) ? 'paid':''}
                `}>
              <InvoiceList
                invoice={invoice}
                overdue={this.checkOverdue(invoice)}
                paid={this.checkPaid(invoice)}/>
            </div>
          ))}


        </div>

        <button onClick={this.handleAddShow}>Add Invoice</button>
        <ModalInvoiceAdd show={this.state.modalAddShow} error={this.state.error} onHide={modalClose}/>
      </main>
    )
  }
}

export default Invoices

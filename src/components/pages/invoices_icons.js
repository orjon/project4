import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import moment from 'moment'
import InvoiceList from './lists/invoiceList'
import InvoiceHeader from './lists/invoiceHeader'
import TableStats from './lists/tableStats'
import ModalInvoice from './modals/invoiceModal'
import ModalProjectUpdate from './modals/projectUpdate'

class Invoices extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        number: '',
        amount: '',
        project_id: ''
      },
      error: ''
    }
    this.today = moment()
    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)
  }

  handleClose() {
    this.setState({ modalShow: false })
  }

  handleShow() {
    this.setState({ modalShow: true })
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

  handleDelete(e) {
    console.log('deleting')
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
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({
        invoices: res.data.invoices,
        projects: res.data.projects,
        clients: res.data.clients
      }))
      .then(() => console.log(this.invoices))
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
      this.setState({ modalShow: false })
      this.getData()
    }
    const totalDue = this.state.invoices && this.sumDue(this.state.invoices)
    const totalOverdue= this.state.invoices && this.sumOverdue(this.state.invoices)

    return (
      <main className='section'>
        <div className='subHeader2 columns'>
          <div>Invoices</div>
          <div className='columns'>
            <div className='subHeader2Label'>total invoiced:</div>
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
                handleDelete={this.handleDelete}
                handleUpdate={this.handleUpdate}
                test={this.tester}
                invoice={invoice}
                overdue={this.checkOverdue(invoice)}
                paid={this.checkPaid(invoice)}/>
            </div>
          ))}


        </div>

        <button onClick={this.handleShow}>Add Invoice</button>

        <ModalInvoice show={this.state.modalShow} error={this.state.error} onHide={modalClose}/>

      </main>
    )
  }
}

export default Invoices

import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import ProjectInvoiceHeader from './lists/ProjectInvoiceHeader'
import ProjectInvoiceList from './lists/ProjectInvoiceList'
import ProjectExpenseHeader from './lists/ProjectExpenseHeader'
import ProjectExpenseList from './lists/ProjectExpenseList'
import ModalProjectUpdate from './modals/projectUpdate'
import TableStats from './lists/TableStats'
import moment from 'moment'


class ProjectShow extends React.Component {
  constructor() {
    super()
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
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
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
    axios.post('/api/projects', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getData())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }


  handleDelete(e) {
    e.preventDefault()
    axios.delete(`/api/projects/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.props.history.push('/projects')

      })
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }


  getData() {
    axios.get(`/api/project/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => {
        this.setState({ project: res.data })
      })
      .then(() => this.setState({ client_name: this.state.project.client.name}))
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
    const invoiceSum = this.state.project.invoices && this.sumArray(this.state.project.invoices).toFixed(2)
    const expenseSum =this.state.project.expenses && this.sumArray(this.state.project.expenses).toFixed(2)


    return (
      <main className="section">
        <div className="subHeader2 columns">
          <div>{this.state.project.code} {this.state.project.name} - {this.state.client_name}</div>
        </div>
        <div className="subHeader2 columns">
          <div>Invoices</div>
          <div className='cellCurrency'>£&thinsp;{invoiceSum}</div>
        </div>
        <div className = 'statsTable'>
          <TableStats totalDue={123} totalOverdue={321}/>
        </div>
        <div className = 'dataTable'>
          <ProjectInvoiceHeader />
          {this.state.project.invoices && this.state.project.invoices.map(invoice => (
            <div key={invoice.id}
              className={`lineItem
                ${this.checkOverdue(invoice) ? 'overdue':''}
                ${this.checkPaid(invoice) ? 'paid':''}
                `}>
              <ProjectInvoiceList invoice={invoice} />
            </div>
          ))}
        </div>


        <div className="subHeader2 columns">
          <div>Expenses</div>
          <div>£&thinsp;{expenseSum}</div>
        </div>

        <div className = 'dataTable'>
          <ProjectExpenseHeader />
          {this.state.project.expenses && this.state.project.expenses.map(expense => (
            <div key={expense.id}
              className='lineItem'>
              <ProjectExpenseList expense={expense} />
            </div>
          ))}
        </div>

        <button onClick={this.handleShow}>Update Project</button>
        <div>
          <button className="button delete" onClick={this.handleDelete}>Delete Project</button>
        </div>

        <ModalProjectUpdate
          show={this.state.modalShow}
          error={this.state.error}
          onHide={modalClose}
          client_id={this.state.client_id}
          code={this.state.project.code}
          name={this.state.project.name}
          id={this.props.match.params.id}
          closeModal={this.handleClose}
        />
      </main>
    )
  }
}

export default ProjectShow

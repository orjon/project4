import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import ProjectInvoiceHeader from './lists/ProjectInvoiceHeader'
import moment from 'moment'


class ProjectShow extends React.Component {
  constructor() {
    super()
    this.state = {
      project: {
        code: '',
        name: ''
      },

      error: ''
    }
    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

  getData() {
    axios.get(`/api/project/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({project: res.data}))
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
    return (
      <main className="section">
        <div className="subHeader2">
          ORIGN {this.state.project.code} : {this.state.project.name}
        </div>
        <div className="subHeader2 columns">
          <div>Invoices</div>
          <div>£&thinsp;{this.state.invoices && this.sumArray(this.state.invoices).toFixed(2)}</div>
        </div>
        <div className = 'dataTable'>
          <ProjectInvoiceHeader />
          {this.state.project.invoices && this.state.project.invoices.map(invoice => (
            <div key={invoice.id}
              className={`lineItem
                ${this.checkOverdue(invoice) ? 'overdue':''}
                ${this.checkPaid(invoice) ? 'paid':''}
                `}>

              <div className = 'tableRow' >
                <div className = 'rowLeft'>
                  <div className = 'cellDate'>{invoice.date_issued}</div>
                  <div className = 'cellDate'>{invoice.date_paid ? 'PAID' : invoice.date_due}</div>
                  <div className = 'cellCode'>{invoice.number}</div>
                </div>
                <div className = 'rowCentre'>
                  <div className = 'cellHalf'>{invoice.description}</div>
                </div>
                <div className = 'rowRight'>
                  <div className = 'cellDateRight'>£&thinsp;{invoice.amount.toFixed(2)}</div>
                </div>
              </div>





            </div>
          ))}
        </div>





        <div>
          <div className="subHeader3">Invoices</div>
          {this.state.project.invoices && this.state.project.invoices.map(invoice => (
            <div key={invoice.id} className="lineItem">{invoice.id} : {invoice.number} : {invoice.amount}</div>
          ))}
        </div>

      </main>
    )
  }
}

export default ProjectShow

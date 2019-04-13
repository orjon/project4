import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import moment from 'moment'
import InvoiceList from './lists/InvoiceList'
import MaterialTable from 'material-table'

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
      },
      error: ''
    }
    this.today = moment()
    this.userCurrent = ''
  }

  getData() {
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({
        invoices: res.data.invoices,
        projects: res.data.projects,
        clients: res.data.clients
      }, () => {
        console.log(this.state.invoices,)
        console.log(this.state.clients)
        console.log(this.state.projects)
      },))
      .catch(err => console.log(err))
  }

  checkPaid(invoice) {
    if (invoice.date_paid) {
      console.log('PAID!')
    }
  }

  // {this.convertDates(invoice)}
  // {this.checkPaid(invoice)}

  convertDates(invoice) {
    const dateDue = moment(invoice.date_due)
    const datePaid = invoice.date_paid ? moment(invoice.date_paid): 'not valid'
    console.log(dateDue.format('YYYY.MM.DD'))
    console.log(datePaid)
    const dueIn = this.today.diff(dateDue, 'days' )
    console.log(dueIn)
    // console.log()
  }

    // <div className={`columns is-mobile  has-text-left is-vcentered loan-border-bottom ${isOverdue(loan) ? 'has-text-danger has-text-weight-bold' : ''}`}>

  componentDidMount() {
    console.log('DASHBOARD')
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)
      .then(() => this.getData())
  }

  render() {
    return (
      <main className="section">
        <div className="subHeader2">Dashboard</div>
        <MaterialTable
          columns={[
            { title: 'Issued', field: 'date_issued' },
            { title: 'No.', field: 'number' },
            { title: 'Client', field: 'client.name'},
            { title: 'Project', field: 'project.code'},
            { title: '', field: 'project.name'},
            { title: 'Amount', field: 'amount', type: 'numeric' }
          ]}
          data={this.state.invoices}
          title="Invoices due"
        />
        <br />
        <div className="subHeader3">Invoices due</div>
        <div>
          {this.state.invoices && this.state.invoices.map(invoice => (
            <div key={invoice.id} className="lineItem">

              {invoice.date_paid && <InvoiceList
                invoice={invoice}
                today={this.today}
              />}
            </div>
          ))}
        </div>
      </main>
    )
  }
}

export default Dashboard

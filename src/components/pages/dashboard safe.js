import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import moment from 'moment'
import InvoiceList from './lists/InvoiceList'

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
        <div className="container">
          <h3>Dashboard</h3>
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
        </div>
      </main>
    )
  }
}

export default Dashboard

  //
  //
  // {this.state.clients && this.state.clients.map(client => (
  //   <option key={client.id} value={client.id}>{client.name}</option>
  //


/*
  axios.get('/api/loans')
    .then(res => {
      const loanedFromMe = res.data.filter(loans => loans.book && loans.book.owner._id === Auth.getPayload().sub)

      loanedFromMe.sort((a, b) => new Date(a.start) - new Date(b.start))

      const loans = {...this.state.loans, loanedFromMe, borrowedByMe}
      this.setState({ loans })
    })




  {this.state.invoices && this.state.invoices.map(invoice => (
    <div key={invoice.id} className="lineItem">
      <div>
        <InvoiceList
          invoice={invoice}
          today={this.today}
        />
      </div>
    </div>
  ))}

*/

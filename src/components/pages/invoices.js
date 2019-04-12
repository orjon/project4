import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Invoices extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)

    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({ invoices: res.data.invoices }, () => console.log(this.state.invoices)))
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h3>Invoices</h3>
        </div>
        <div>
          {this.state.invoices && this.state.invoices.map(invoice => (
            <div key={invoice.id}>
              <div>{invoice.id} : {invoice.number}</div>
            </div>
          ))}
        </div>
      </main>
    )
  }
}

export default Invoices

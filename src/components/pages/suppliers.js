import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Suppliers extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)

    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({ suppliers: res.data.suppliers }, () => console.log(this.state.suppliers)))
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h3>Suppliers</h3>
        </div>
        <div>
          {this.state.suppliers && this.state.suppliers.map(supplier => (
            <div key={supplier.id}>
              <div>{supplier.id} : {supplier.name}</div>
            </div>
          ))}
        </div>
      </main>
    )
  }
}

export default Suppliers

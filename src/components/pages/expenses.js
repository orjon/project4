import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Expenses extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)

    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({ expenses: res.data.expenses }, () => console.log(this.state.expenses)))
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h3>Expenses</h3>
        </div>
        <div>
          {this.state.expenses && this.state.expenses.map(expense => (
            <div key={expense.id}>
              <div>{expense.id} : {expense.description}</div>
            </div>
          ))}
        </div>
      </main>
    )
  }
}

export default Expenses

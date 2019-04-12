import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h3>Dashboard</h3>
        </div>
      </main>
    )
  }
}

export default Dashboard

import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Clients extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        name: ''
      },
      error: ''
    }

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
    axios.post('/api/clients', this.state.data)
    // axios.post('/api/client', this.state.data, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data)

    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({ clients: res.data.clients }, () => console.log(this.state.clients)))
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h3>Clients</h3>
        </div>
        <div>
          {this.state.clients && this.state.clients.map(client => (
            <div key={client.id}>
              <div>{client.id} : {client.name} (user: {client.user.id})</div>
            </div>
          ))}
        </div>


        <form
          className="update"
          onSubmit={this.handleSubmit}
        >
          <div className="columns">
            <div className="column">
              <h3 className="title is-4">New Client</h3>
            </div>
          </div>
          <div className="control has-icons-left has-icons-right">
            <input
              className={`input ${this.state.error ? 'is-danger': ''}`}
              name="name"
              placeholder="Client name"
              value={this.state.data.name}
              onChange={this.handleChange}
            />
          </div>
          <br />
          {this.state.error && <small className="help is-danger">{this.state.error} </small>}
          <div>
            <button
              className="button is-success is-pulled-right"
            >New Client &#x3E;</button>
          </div>
        </form>

      </main>
    )
  }
}

export default Clients

import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Suppliers extends React.Component {
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
    axios.post('/api/suppliers', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getData())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }

  getData(){
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({ suppliers: res.data.suppliers }, () => console.log(this.state.suppliers)))
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data)
      .then(() => this.getData())
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h3>Suppliers</h3>
        </div>
        <div>
          {this.state.suppliers && this.state.suppliers.map(supplier => (
            <div key={supplier.id} className="lineItem">
              <div>{supplier.id} : {supplier.name}</div>
            </div>
          ))}
        </div>

        <form className="update" onSubmit={this.handleSubmit}>
          <h3 className="title">New Supplier</h3>
          <div>
            <input
              className={`input ${this.state.error ? 'is-danger': ''}`}
              name="name"
              placeholder="Supplier name"
              value={this.state.data.name}
              onChange={this.handleChange}
            />
          </div>
          <br />
          {this.state.error && <small className="help is-danger">{this.state.error} </small>}
          <div>
            <button className="button">New Supplier &#x3E;</button>
          </div>
        </form>



      </main>
    )
  }
}

export default Suppliers

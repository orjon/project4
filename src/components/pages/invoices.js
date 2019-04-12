import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Invoices extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        number: '',
        amount: '',
        project_id: ''
      },
      error: ''
    }
    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  handleChangeDropDown({ target: { value }}) {
    const [ project, client ] = value.split('-')
    console.log(project)
    console.log(client)
    const data = {...this.state.data, project_id: project, client_id: client }
    const error = ''
    this.setState({ data, error })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/invoices', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getData())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }


  getData() {
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({
        invoices: res.data.invoices,
        projects: res.data.projects,
        clients: res.data.clients
      }, () => {
        console.log(res.data.invoices,)
        console.log(this.state.clients)
        console.log(this.state.projects)
      }))
      .catch(err => console.log(err))
  }


  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)
      .then(() => this.getData())
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
              <div>{invoice.number} : {invoice.description} ({invoice.client.name}) {invoice.project.name} : {invoice.amount} </div>
            </div>
          ))}
        </div>

        <form className="update" onSubmit={this.handleSubmit}>
          <h3 className="title">New Invoice</h3>

          <div className="select">
            <select
              name="project_id"
              defaultValue="default"
              onChange={this.handleChangeDropDown}>
              <option disabled value="default">Select client: project</option>
              {this.state.projects && this.state.projects.map(project => (
                <option key={project.id} value={`${project.id}-${project.client.id}`}>{project.client.name}: {project.name}</option>
              ))}
            </select>
          </div>

          <div>
            <input
              className={`input ${this.state.error ? 'is-danger': ''}`}
              name="number"
              placeholder="Invoice number"
              value={this.state.data.number}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div>
            <input
              className={`input ${this.state.error ? 'is-danger': ''}`}
              name="amount"
              placeholder="Amount"
              value={this.state.data.amount}
              onChange={this.handleChange}
            />
          </div>
          <br />
          {this.state.error && <small className="help is-danger">{this.state.error} </small>}
          <div>
            <button className="button">New Invoice &#x3E;</button>
          </div>
        </form>

      </main>
    )
  }
}

export default Invoices



//
//
// <div className="select">
//   <select
//     name="client_id"
//     defaultValue="default"
//     onChange={this.handleChange}>
//     <option disabled value="default">Select client</option>
//     {this.state.clients && this.state.clients.map(client => (
//       <option key={client.id} value={client.id}>{client.name}</option>
//     ))}
//   </select>
// </div>

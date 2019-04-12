import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'

class Projects extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        code: '',
        name: '',
        client_id: ''
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
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({
        projects: res.data.projects,
        clients: res.data.clients
      }, () => {
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
          <h3>Projects</h3>
        </div>
        <div className="container">
          {this.state.projects && this.state.projects.map(project => (
            <Link to={`/project/${project.id}`} key={project.id} className="lineItem">
              <div >{project.id} : {project.code} : {project.name} : {project.client.name} : {project.invoices.id}</div>
            </Link>
          ))}
        </div>


        <form className="update container" onSubmit={this.handleSubmit}>
          <h3 className="title">New Project</h3>

          <div className="select">
            <select
              name="client_id"
              defaultValue="default"
              onChange={this.handleChange}>
              <option disabled value="default">Select client</option>
              {this.state.clients && this.state.clients.map(client => (
                <option key={client.id} value={client.id}>{client.name}</option>
              ))}
            </select>
          </div>

          <div>
            <input
              className={`input ${this.state.error ? 'is-danger': ''}`}
              name="code"
              placeholder="Project code"
              value={this.state.data.code}
              onChange={this.handleChange}
            />
          </div>
          <br />
          <div>
            <input
              className={`input ${this.state.error ? 'is-danger': ''}`}
              name="name"
              placeholder="Project name"
              value={this.state.data.name}
              onChange={this.handleChange}
            />
          </div>
          <br />
          {this.state.error && <small className="help is-danger">{this.state.error} </small>}
          <div>
            <button className="button">New Project &#x3E;</button>
          </div>
        </form>

      </main>
    )
  }
}

export default Projects

// <div>{project.client.name} (id: {project.client.id})</div>
// <div>{project.invoices.number} {project.invoices.amount}</div>


//
// <div className="select">
//   <select
//     name="client"
//     defaultValue={this.state.data.clients.id || 'default'}
//     onChange={this.handleChange}>
//
//     <option disabled value="default">Choose a genre</option>
//     {this.state.clients && this.state.clients.map(client => (
//       <option key={client.id} value={client.id}>{client.name}</option>
//     ))}
//   </select>
//   {errors.genre && <small className="help is-danger">Please choose a genre</small> }
// </div>

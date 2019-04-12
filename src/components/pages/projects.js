import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Projects extends React.Component {
  constructor() {
    super()
    this.state = {
    }
    this.userCurrent = ''
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)

    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({ projects: res.data.projects }, () => console.log(this.state.projects)))
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h3>Projects</h3>
        </div>
        <div>
          {this.state.projects && this.state.projects.map(project => (
            <div key={project.id}>
              <div>{project.id} : {project.code} : {project.name} : {project.client.id}.{project.client.name} : {project.invoices.id}</div>
            </div>
          ))}
        </div>
      </main>
    )
  }
}

export default Projects

// <div>{project.client.name} (id: {project.client.id})</div>
// <div>{project.invoices.number} {project.invoices.amount}</div>

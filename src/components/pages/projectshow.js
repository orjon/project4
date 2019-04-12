import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import Plot from 'react-plotly.js'

class ProjectShow extends React.Component {
  constructor() {
    super()
    this.state = {
      project: {
        code: '',
        name: ''
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
    axios.get(`/api/project/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({ project: res.data}))
      .catch(err => this.setState({errors: err.response.data.errors}))
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)
      .then(() => this.getData())
  }

  render() {
    return (
      <main className="section">
        <div className="subHeader2">
          <h3>{this.state.project.code} : {this.state.project.name}</h3>
        </div>

        <div>
          <div className="subHeader3">Invoices</div>
          {this.state.project.invoices && this.state.project.invoices.map(invoice => (
            <div key={invoice.id} className="lineItem">{invoice.id} : {invoice.number} : {invoice.amount}</div>
          ))}
        </div>

      </main>
    )
  }
}

export default ProjectShow


// <Plot
//   data={[
//     {
//       x: [1, 2, 3],
//       y: [2, 6, 3],
//       type: 'scatter',
//       mode: 'lines+points',
//       marker: {color: 'red'}
//     },
//     {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]}
//   ]}
//   layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
// />



// <div>
//   {this.state.projects && this.state.projects.map(project => (
//     <Link to={`/projects/${project.id}`} key={project.id}>
//       <div>{project.id} : {project.code} : {project.name} : {project.client.name} : {project.invoices.id}</div>
//     </Link>
//   ))}
// </div>

        //
        // <form className="update" onSubmit={this.handleSubmit}>
        //   <h3 className="title">New Project</h3>
        //
        //   <div className="select">
        //     <select
        //       name="client_id"
        //       defaultValue="default"
        //       onChange={this.handleChange}>
        //       <option disabled value="default">Select client</option>
        //       {this.state.clients && this.state.clients.map(client => (
        //         <option key={client.id} value={client.id}>{client.name}</option>
        //       ))}
        //     </select>
        //   </div>
        //
        //   <div>
        //     <input
        //       className={`input ${this.state.error ? 'is-danger': ''}`}
        //       name="code"
        //       placeholder="Project code"
        //       value={this.state.data.code}
        //       onChange={this.handleChange}
        //     />
        //   </div>
        //   <br />
        //   <div>
        //     <input
        //       className={`input ${this.state.error ? 'is-danger': ''}`}
        //       name="name"
        //       placeholder="Project name"
        //       value={this.state.data.name}
        //       onChange={this.handleChange}
        //     />
        //   </div>
        //   <br />
        //   {this.state.error && <small className="help is-danger">{this.state.error} </small>}
        //   <div>
        //     <button className="button">New Project &#x3E;</button>
        //   </div>
        // </form>

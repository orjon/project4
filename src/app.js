import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }


  componentDidMount() {
    axios.get('/api/projects')
      .then(res => this.setState({ projects: res.data }))
  }


  render() {
    return (
      <div>
        <h1>project4</h1>
        {this.state.projects && this.state.projects.map(project => (
          <div key={project.id}>
            <div>{project.code} : {project.name}</div>
            <div>{project.client.name} (id: {project.client.id})</div>
            <div>{project.invoices.number} {project.invoices.amount}</div>
          </div>
        ))}
      </div>
    )
  }



}
ReactDOM.render(
  <App />,
  document.getElementById('root')
)

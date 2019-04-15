import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import ProjectList from './lists/ProjectList'
import ProjectHeader from './lists/ProjectHeader'
import ModalProjectAdd from './modals/projectAdd'

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

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose() {
    this.setState({ modalShow: false })
  }

  handleShow() {
    this.setState({ modalShow: true })
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
    const modalClose = () => {
      this.setState({ modalShow: false })
      this.getData()
    }

    return (
      <main className="section">
        <div className="subHeader2">Projects</div>
        <div className = 'dataTable'>
          <ProjectHeader />
          {this.state.projects && this.state.projects.map(project => (
            <div key={project.id} className='lineItem'>
              <ProjectList
                project={project}
              />
            </div>
          ))}
        </div>

        <button onClick={this.handleShow}>Add Project</button>

        <ModalProjectAdd show={this.state.modalShow} error={this.state.error} onHide={modalClose}/>


      </main>
    )
  }
}

export default Projects

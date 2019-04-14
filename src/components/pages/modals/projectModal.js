import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/auth'
import Modal from 'react-bootstrap/Modal'

class ModalProject extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      data: {
        description: '',
        amount: '',
        date: '',
        supplier_id: '',
        project_id: ''
      },
      error: '',
      modalShow: false,
      selectedDay: undefined
    }

    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDate = this.handleDate.bind(this)
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)

  }

  handleDate(day)  {
    const date = this.dateConvert(day)
    const data = {...this.state.data, date: date }
    const error = ''
    this.setState({ data, error })
  }

  clearState() {
    const data = {
      description: '',
      amount: '',
      date: '',
      supplier_id: '',
      project_id: ''
    }
    this.setState({ data })
  }

  handleChange({ target: { name, value }}) {
    console.log('handlechange:')
    console.log(value)
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/projects', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(this.props.onHide)
      .then(() => this.clearState())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }

  handleChangeDropDown({ target: { value }}) {
    const [ project, client ] = value.split('-')
    console.log(project)
    console.log(client)
    const data = {...this.state.data, project_id: project, client_id: client }
    const error = ''
    this.setState({ data, error })
  }

  getData() {
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({
        invoices: res.data.invoices,
        projects: res.data.projects,
        clients: res.data.clients
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
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="subHeader2">New Project</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form id="projectNew" className="update" onSubmit={this.handleSubmit}>


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
                className={`input ${this.props.error ? 'is-danger': ''}`}
                name="description"
                placeholder="Project description"
                value={this.state.data.description}
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
              <button form="projectNew" className="button">Add new project</button>
            </div>
          </form>

        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.props.onHide}>Cancel</button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalProject


        // <form className="update container" onSubmit={this.handleSubmit}>
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

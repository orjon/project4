import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/auth'
import Modal from 'react-bootstrap/Modal'


class ModalProjectUpdate extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      data: {
        client_id: '',
        code: '',
        name: ''
      },
      error: '',
      modalShow: false,
      selectedDay: undefined
    }

    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleClose() {
    this.setState({ modalShow: false }, this.getData())
  }


  handleChange({ target: { name, value }}) {
    console.log('handlechange:')
    console.log(value)
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  componentDidMount() {
    this.getData()
    axios.get(`/api/project/${this.props.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => {
        this.setState({ data: {...res.data, client_id: res.data.client.id }})
      })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.put(`/api/projects/${this.props.id}`, this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.props.closeModal()
      })
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
        clients: res.data.clients
      }))
      .catch(err => console.log(err))
  }

  render() {
    if(!this.state.data.client) return null
    console.log('modal state', this.state)
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="subHeader2">Update Project</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form id="projectUpdate" className="update" onSubmit={this.handleSubmit}>

            <div className="select">
              <select
                name="client_id"
                defaultValue={this.state.data.client.id}
                onChange={this.handleChange}>
                {this.state.clients && this.state.clients.map(client => (
                  <option key={client.id} value={client.id}>
                    {client.name}
                  </option>
                ))}
              </select>
            </div>
            <br />
            <div>
              <input
                className={`input ${this.props.error ? 'is-danger': ''}`}
                name="code"
                placeholder="Project code"
                value={this.state.data.code || this.props.code}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>
              <input
                className={`input ${this.props.error ? 'is-danger': ''}`}
                name="name"
                placeholder="Project Title"
                value={this.state.data.name || this.props.name}
                onChange={this.handleChange}
              />
            </div>

            <br />
            {this.state.error && <div className="help is-danger">{this.state.error} </div>}
            <div>
              <button form="projectUpdate" className="button">Update project</button>
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

export default ModalProjectUpdate

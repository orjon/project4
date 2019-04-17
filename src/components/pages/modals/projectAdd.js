import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/auth'
import Modal from 'react-bootstrap/Modal'

class ModalProjectAdd extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      data: {
        client_id: '',
        code: '',
        name: ''
      },
      error: '',
      modalAddShow: false
    }

    this.userCurrent = ''

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  



  }

  clearState() {
    const data = {
      client_id: '',
      code: '',
      name: ''
    }
    this.setState({ data })
  }


  handleChange({ target: { name, value }}) {
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


  getData() {
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({
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
                label="get the"
                name="client_id"
                defaultValue="default"
                onChange={this.handleChange}>
                <option disabled value="default">Select Client</option>
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
                value={this.state.data.code}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>
              <input
                className={`input ${this.props.error ? 'is-danger': ''}`}
                name="name"
                placeholder="Project Title"
                value={this.state.data.name}
                onChange={this.handleChange}
              />
            </div>
            <br />
            {this.state.error && <div className="help is-danger">{this.state.error} </div>}

          </form>

        </Modal.Body>
        <Modal.Footer>

          <div className = 'columns ticks'>
            <div className= 'icons'>
              <button className='icon' form="projectNew">
                <img alt='edit'
                  src='http://www.orjon.com/dev/project4/iconAddCircle.png'
                  width='50'
                  height='50' />
              </button>
            </div>
          </div>

          <div className= 'icons'>
            <button className='icon' onClick={this.props.onHide}>
              <img alt='edit'
                src='http://www.orjon.com/dev/project4/iconDeleteCircle.png'
                width='50'
                height='50' />
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalProjectAdd
//
// <div>
//   <button form="projectNew" className="button">Add new project</button>
// </div>

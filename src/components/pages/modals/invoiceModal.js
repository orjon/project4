import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/auth'
import Modal from 'react-bootstrap/Modal'


class ModalInvoice extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      data: {
        number: '',
        description: '',
        amount: '',
        date_issued: '',
        date_due: '',
        date_paid: '',
        client_id: '',
        project_id: ''
      },
      error: '',
      modalShow: false
    }

    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)

  }

  clearState() {
    const data = {
      number: '',
      description: '',
      amount: '',
      date_issued: '',
      date_due: '',
      date_paid: '',
      client_id: '',
      project_id: ''
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
    axios.post('/api/invoices', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
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
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >


        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="subHeader2">New Invoice</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form id="InvoiceNew" className="update" onSubmit={this.handleSubmit}>

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

            <div>
              <input
                className={`input ${this.props.error ? 'is-danger': ''}`}
                name="description"
                placeholder="Invoice description"
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

            <div>
              <input
                className={`input ${this.state.error ? 'is-danger': ''}`}
                type="date"
                name="date_issued"
                placeholder="issued YYYY-MMM-DD"
                value={this.state.data.date_issued}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div>
              <input
                className={`input ${this.state.error ? 'is-danger': ''}`}
                name="date_due"
                type="date"
                placeholder="due YYYY-MMM-DD"
                value={this.state.data.date_due}
                onChange={this.handleChange}
              />
            </div>

            <div>
              <input
                className={`input ${this.state.error ? 'is-danger': ''}`}
                name="date_paid"
                type="date"
                placeholder="paid YYYY-MMM-DD"
                value={this.state.data.date_paid}
                onChange={this.handleChange}
              />
            </div>

            <br />
            {this.state.error && <small className="help is-danger">{this.state.error} </small>}
            <div>
              <button form="InvoiceNew" className="button">Add new invoice</button>
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

export default ModalInvoice

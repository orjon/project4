import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/auth'
import Modal from 'react-bootstrap/Modal'


class ModalSupplier extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      data: {
        name: ''
      },
      error: '',
      modalShow: false
    }

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
    axios.post('/api/suppliers', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(this.props.onHide)
      .then(() => this.clearState())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Something went wrong...'}, () => console.log('this.state', this.state))
      })
  }

  clearState() {
    const data = { name: ''}
    this.setState({ data })
  }


  render() {
    const cancelForm = () => {
      this.clearState()
      this.props.onHide()
    }

    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="subHeader2">New Supplier</div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <form id="supplierNew" className="update" onSubmit={this.handleSubmit}>
            <div>
              <input
                className={`input ${this.props.error ? 'is-danger': ''}`}
                name="name"
                placeholder="Supplier / Service provider name"
                value={this.state.data.name}
                onChange={this.handleChange}
              />
            </div>
            <br />
            {this.state.error && <small className="help is-danger">{this.state.error} </small>}

          </form>
        </Modal.Body>
        <Modal.Footer>

          <div className = 'columns ticks'>
            <div className= 'icons'>
              <button className='icon' form="supplierNew">
                <img alt='edit'
                  src='http://www.orjon.com/dev/project4/iconAddCircle.png'
                  width='50'
                  height='50'/>
              </button>
            </div>
          </div>

          <div className= 'icons'>
            <button className='icon' onClick={this.props.onHide}>
              <img alt='edit'
                src='http://www.orjon.com/dev/project4/iconDeleteCircle.png'
                width='50'
                height='50'/>
            </button>
          </div>

        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalSupplier

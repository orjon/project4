import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import ClientHeader from './lists/ClientHeader'
import ClientList from './lists/ClientList'
import ModalClient from './modals/clientModal'



class Clients extends React.Component {
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
    axios.post('/api/clients', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getData())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }

  getData(){
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({ clients: res.data.clients }, () => console.log(this.state.clients)))
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data)
      .then(() => this.getData())
  }



  render() {
    const modalClose = () => {
      this.setState({ modalShow: false })
      this.getData()
    }

    return (
      <main className="section">
        <div className="subHeader2">Clients</div>
        <div className = 'dataTable'>
          <ClientHeader />
          {this.state.clients && this.state.clients.map(client => (
            <div key={client.id} className="lineItem">
              <ClientList
                client={client}
              />
            </div>
          ))}
        </div>
        <button onClick={this.handleShow}>Add Client</button>


        <ModalClient show={this.state.modalShow} error={this.state.error} onHide={modalClose}/>

      </main>
    )
  }
}

export default Clients

//
// <Button variant="primary" onClick={this.handleShow}>
//   Also Add Client
// </Button>

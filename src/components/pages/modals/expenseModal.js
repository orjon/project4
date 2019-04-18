import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/auth'
import Modal from 'react-bootstrap/Modal'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import moment from 'moment'

class ModalExpense extends React.Component {
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

  dateConvert(day){
    return moment(day).format('YYYY-MM-DD')
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
    axios.post('/api/expenses', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(this.props.onHide)
      .then(() => this.clearState())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Something went wrong...'}, () => console.log('this.state', this.state))
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
        suppliers: res.data.suppliers,
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
            <div className="subHeader2">New Expense</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form id="expenseNew" className="update" onSubmit={this.handleSubmit}>
            <label htmlFor='expDay'> Please select the day that the expense was incurred.</label>
            <div>
              <DayPickerInput id='expDay' onDayChange={this.handleDate} format={'YYYY-MM-DD'}/>
            </div><br />

            <div className="select">
              <select
                name="project_id"
                defaultValue="default"
                onChange={this.handleChangeDropDown}>
                <option disabled value="default">Which client & project was this for?</option>
                {this.state.projects && this.state.projects.map(project => (
                  <option key={project.id} value={`${project.id}-${project.client.id}`}>{project.client.name}: {project.name}</option>
                ))}
              </select>
            </div><br />
            <div className="select">
              <select
                name="supplier_id"
                defaultValue="default"
                onChange={this.handleChange}>
                <option disabled value="default">Select supplier / service provider</option>
                {this.state.suppliers && this.state.suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
            </div><br />

            <div>
              <input
                className={`input ${this.props.error ? 'is-danger': ''}`}
                name="description"
                placeholder="Expense description"
                value={this.state.data.description}
                onChange={this.handleChange}
              />
            </div><br />
            <div>
              <input
                id='expAmnt'
                className={`input ${this.state.error ? 'is-danger': ''}`}
                name="amount"
                placeholder="Cost of good / service eg £ '175.50' "
                value={this.state.data.amount}
                onChange={this.handleChange}
              />
            </div>

            {this.state.error && <small className="help is-danger">{this.state.error} </small>}
          </form>

        </Modal.Body>
        <Modal.Footer>

          <div className = 'columns ticks'>
            <div className= 'icons'>
              <button className='icon' form="expenseNew">
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

export default ModalExpense

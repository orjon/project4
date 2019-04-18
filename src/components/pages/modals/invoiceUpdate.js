import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/auth'
import Modal from 'react-bootstrap/Modal'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import moment from 'moment'


class ModalInvoiceUpdate extends React.Component {
  constructor(...props) {
    super(...props)

    this.state = {
      data: {
        project_id: '',
        amount: 0,
        number: '',
        client_id: ''
      },
      error: '',
      modalShow: true,
      selectedDay: undefined
    }

    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleDateIssued = this.handleDateIssued.bind(this)
    this.handleDatePaid = this.handleDatePaid.bind(this)
    this.handleDateDue = this.handleDateDue.bind(this)
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)
  }


  handleClose() {
    this.setState({ modalShow: false }, this.getData())
  }

  handleDateIssued(day)  {
    console.log(day)
    const date = this.dateConvert(day)
    const data = {...this.state.data, date_issued: date }
    const error = ''
    this.setState({ data, error })
  }

  handleDateDue(day) {
    console.log(day)
    const date = this.dateConvert(day)
    const data = {...this.state.data, date_due: date }
    const error = ''
    this.setState({ data, error })
  }

  handleDatePaid(day)  {
    console.log(day)
    const date = this.dateConvert(day)
    const data = {...this.state.data, date_paid: date }
    const error = ''
    this.setState({ data, error })
  }


  dateConvert(day){
    return moment(day).format('YYYY-MM-DD')
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
    axios.get(`/api/invoice/${this.props.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => {
        this.setState({
          data: {...res.data, project_id: res.data.project.id}})
      })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.put(`/api/invoice/${this.props.id}`, this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => {
        this.props.closeModal()
      })
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Something went wrong...'}, () => console.log('this.state', this.state))
      })
  }


  handleChangeDropDown({ target: { value }}) {
    const [ project, client ] = value.split('-')
    console.log('project no: ' + project)
    console.log('client no: '+client)
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

  render() {
    console.log(this.state.data)
    return (
      <Modal
        {...this.props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >

        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="subHeader2">Update Invoice</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <form id="invoiceUpdate" className="update" onSubmit={this.handleSubmit}>

            <div className="select">
              <select
                name="project_id"
                defaultValue={`${this.state.data.project_id}-${this.props.client_id}`}
                onChange={this.handleChangeDropDown}>
                {this.state.projects && this.state.projects.map(project => (
                  <option
                    key={project.id}
                    value={`${project.id}-${project.client.id}`}>
                    {project.client.name}: {project.name}
                  </option>
                ))}
              </select>
            </div><br />
            <div>
              <input
                className={`input ${this.state.error ? 'is-danger': ''}`}
                name="number"
                placeholder="Invoice number"
                value={this.state.data.number}
                onChange={this.handleChange}
              />
            </div><br />
            <div>
              <input
                className={`input ${this.props.error ? 'is-danger': ''}`}
                name="description"
                placeholder="Invoice description"
                value={this.state.data.description}
                onChange={this.handleChange}
              />
            </div><br />
            <div>
              <input
                className={`input ${this.state.error ? 'is-danger': ''}`}
                name="amount"
                placeholder="Amount"
                value={this.state.data.amount}
                onChange={this.handleChange}
              />
            </div><br />

            <label htmlFor='invIssue'> Please select date of issue</label>
            <div>
              <DayPickerInput
                id='invIssue'
                defaultValue={this.state.data.date_issued}
                onDayChange={this.handleDateIssued}
                format={'YYYY-MM-DD'}/>
            </div><br />
            <label htmlFor='invDue'> Please select due date</label>
            <div>
              <DayPickerInput
                onDayChange={this.handleDateDue}
                format={'YYYY-MM-DD'}/>
            </div><br />
            <label htmlFor='invPaid'> Please select date of payment (if paid)</label>
            <div>
              <DayPickerInput
                id='invPaid'
                onDayChange={this.handleDatePaid}
                format={'YYYY-MM-DD'}/>
            </div><br />
            {this.state.error && <div className="help is-danger">{this.state.error} </div>}
          </form>


        </Modal.Body>
        <Modal.Footer>

          <div className = 'columns ticks'>
            <div className= 'icons'>
              <button className='icon' form="invoiceUpdate">
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


export default ModalInvoiceUpdate

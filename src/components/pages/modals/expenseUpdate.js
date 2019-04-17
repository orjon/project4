import React from 'react'
import axios from 'axios'
import Auth from '../../../lib/auth'
import Modal from 'react-bootstrap/Modal'
import DayPickerInput from 'react-day-picker/DayPickerInput'
import 'react-day-picker/lib/style.css'
import moment from 'moment'


class ModalExpenseUpdate extends React.Component {
  constructor(...props) {
    super(...props)

    this.state = {
      data: {
        amount: '0',
        description: ''
      },
      error: '',
      modalShow: true,
      selectedDay: undefined
    }

    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleDate = this.handleDate.bind(this)

    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)
  }


  handleClose() {
    this.setState({ modalShow: false }, this.getData())
  }

  handleDate(day)  {
    console.log(day)
    const date = this.dateConvert(day)
    const data = {...this.state.data, date: date }
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
    axios.get(`/api/expenses/${this.props.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => {
        this.setState({
          data: {...res.data, expense_id: res.data.expense.id}})
      })
      .then(() =>{
        this.setState({
          data: { description: this.props.description}
        })
      })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.put(`/api/expenses/${this.props.id}`, this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
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
        clients: res.data.clients,
        suppliers: res.data.suppliers
      }))
      .then(() => {
        const data = {...this.state.data,
          description: this.props.description,
          amount: this.props.amount
        }
        const error = ''
        this.setState({ data, error })
      })
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
            <div className="subHeader2">Update Expense</div>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <form id="invoiceUpdate" className="update" onSubmit={this.handleSubmit}>

            <div className="select">
              <select
                name="supplier_id"
                defaultValue={this.props.supplier_id}
                onChange={this.handleChange}>
                <option disabled value="default">Select Supplier</option>
                {this.state.suppliers && this.state.suppliers.map(supplier => (
                  <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
                ))}
              </select>
            </div>

            <div className="select">
              <select
                name="project_id"
                defaultValue="default"
                onChange={this.handleChangeDropDown}>
                <option disabled value="default">Select Client & Project</option>
                {this.state.projects && this.state.projects.map(project => (
                  <option key={project.id} value={`${project.id}-${project.client.id}`}>{project.client.name}: {project.name}</option>
                ))}
              </select>
            </div>

            <div>
              <input
                className={`input ${this.state.error ? 'is-danger': ''}`}
                name="description"
                placeholder="description"
                defaultValue={this.props.description}
                onChange={this.handleChange}
              />
            </div>



            <br />
            {this.state.error && <div className="help is-danger">{this.state.error} </div>}
            <div>
              <button form="invoiceUpdate" className="button">Update Expense</button>
            </div>
          </form>

          <br />
          <div>
            <input
              className={`input ${this.state.error ? 'is-danger': ''}`}
              name="amount"
              placeholder="Amount"
              defaultValue={this.props.amount}
              onChange={this.handleChange}
            />
          </div>






        </Modal.Body>
        <Modal.Footer>
          <button onClick={this.props.onHide}>Cancel</button>
        </Modal.Footer>
      </Modal>
    )
  }
}


export default ModalExpenseUpdate


/*



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
</div>






            <br />

            <div>
              <DayPickerInput
                defaultValue={this.state.data.date_issued}
                onDayChange={this.handleDateIssued}
                format={'YYYY-MM-DD'}/>
            </div>
            <div>
              <DayPickerInput

                onDayChange={this.handleDateDue}
                format={'YYYY-MM-DD'}/>
            </div>
            <div>
              <DayPickerInput

                onDayChange={this.handleDatePaid}
                format={'YYYY-MM-DD'}/>
            </div>

*/






// value={this.state.data.date_issued}
// value={this.state.data.date_due}
// value={this.state.data.date_paid}

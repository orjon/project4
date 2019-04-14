import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import ExpenseList from './lists/ExpenseList'
import ExpenseHeader from './lists/ExpenseHeader'
import ModalExpense from './modals/ExpenseModal'

class Expenses extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        amount: '',
        description: ''
      },
      error: ''
    }
    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)
    this.clearState = this.clearState.bind(this)
  }

  handleClose() {
    this.setState({ modalShow: false })
  }

  handleShow() {
    this.setState({ modalShow: true })
  }

  clearState() {
    const data = { amount: '',description: ''}
    this.setState({ data })
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  handleChangeDropDown({ target: { value }}) {
    const [ project, client ] = value.split('-')
    const data = {...this.state.data, project_id: project, client_id: client }
    const error = ''
    this.setState({ data, error })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/expenses', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getData())
      .then(() => this.clearState())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }

  getData() {
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({
        expenses: res.data.expenses,
        suppliers: res.data.suppliers,
        projects: res.data.projects
      }))
      .catch(err => console.log(err))
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)
      .then(() => this.getData())
  }

  sumArray(array) {
    const length = array.length
    let sum = 0
    for (let i=0; i<length; i++) {
      sum += array[i].amount
    }
    return sum
  }


  render() {
    const modalClose = () => {
      this.setState({ modalShow: false })
      this.getData()
    }

    return (
      <main className="section">
        <div className="subHeader2 columns">
          <div>Expenses</div>

          <div>£&thinsp;{this.state.expenses && this.sumArray(this.state.expenses).toFixed(2)}</div>
        </div>
        <div className = 'dataTable'>
          <ExpenseHeader />
          {this.state.expenses && this.state.expenses.map(expense => (
            <div key={expense.id}
              className='lineItem'>
              <ExpenseList
                expense={expense}
              />
            </div>
          ))}
        </div>

        <button onClick={this.handleShow}>Add Expense</button>

        <ModalExpense show={this.state.modalShow} error={this.state.error} onHide={modalClose}/>

      </main>
    )
  }
}

export default Expenses

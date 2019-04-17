import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'
import ExpenseItem from './lists/expenseItem'
import ExpenseHeader from './lists/expenseHeader'
import ModalExpenseUpdate from './modals/expenseUpdate'
import moment from 'moment'


class ExpenseShow extends React.Component {
  constructor() {
    super()
    this.state = {
      expense: {
        amount: '',
        description: ''
      },
      error: '',
      modalShow: false
    }
    this.today = moment()
    this.userCurrent = ''

    this.invoice = ''
    this.handleShow = this.handleShow.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleClose() {
    this.setState({ modalShow: false }, this.getData())
  }

  handleShow() {
    this.setState({ modalShow: true })
  }



  handleChange({ target: { name, value }}) {
    const data = {...this.state.expense, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  getData() {
    axios.get(`/api/expenses/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => {
        this.setState({ expense: res.data })
      })
      .then(() => this.invoice = this.state.invoice)
      // .then(() => this.setState({ client_id: this.state.invoice.client.id}))
      // .catch(err => this.setState({errors: err.response.data.errors}))
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

    const expense = this.state.expense


    return (
      <main className="section">
        <div className="subHeader2 columns">
          <div>
            <Link to="/expenses" className='headerLink'>Expense</Link> : {expense && expense.description}</div>
          <div className='columns'>
            <div className='subHeader2Label'></div>
            <div className='subHeader2Currency'>£&thinsp;{expense.amount ? expense.amount.toFixed(2) : 0}</div>
          </div>
        </div>
        <div className = 'dataTable'>
          <ExpenseHeader />
          <div className='lineItem'>
            <ExpenseItem expense={expense}/>
          </div>
        </div>

        <button onClick={this.handleShow}>Update Expense</button>
        <div>
          <button className="button delete" onClick={this.handleDelete}>Delete Expense</button>
        </div>

        <ModalExpenseUpdate
          show={this.state.modalShow}
          error={this.state.error}
          onHide={modalClose}
          id={this.props.match.params.id}
          description={this.state.expense.description}
          amount={this.state.expense.amount}
          closeModal={this.handleClose}
          supplier={this.state.expense.supplier}
        />

      </main>
    )
  }
}

export default ExpenseShow
/*

show={this.state.modalShow}
error={this.state.error}
onHide={modalClose}
client_id={this.state.client_id}
id={this.props.match.params.id}
description={this.state.expense.description}
amount={this.state.expense.amount}
closeModal={this.handleClose}



this.handleChange = this.handleChange.bind(this)
this.handleSubmit = this.handleSubmit.bind(this)
this.handleDelete = this.handleDelete.bind(this)


handleChange({ target: { name, value }}) {
  const data = {...this.state.data, [name]: value }
  const error = ''
  this.setState({ data, error })
}

handleSubmit(e) {
  e.preventDefault()
  axios.post('/api/expenses', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
    .then(() => this.getData())
    .catch((err) => {
      console.log('the error is', err)
      this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
    })
}


handleDelete(e) {
  e.preventDefault()
  axios.delete(`/api/expenses/${this.props.match.params.id}`, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
    .then(() => {
      this.props.history.push('/expenses')

    })
    .catch((err) => {
      console.log('the error is', err)
      this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
    })
}








        <ModalExpenseUpdate

          show={this.state.modalShow}
          error={this.state.error}
          onHide={modalClose}
          client_id={this.state.client_id}
          id={this.props.match.params.id}
          number={this.state.invoice.number}
          amount={this.state.invoice.amount}
          closeModal={this.handleClose}
        />
*/

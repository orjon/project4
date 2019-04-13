import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import ExpenseList from './lists/ExpenseList'
import ExpenseHeader from './lists/ExpenseHeader'

class Expense extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        amount: '',
        description: ''
      },
      error: ''
    }
    this.default = 'default'
    this.userCurrent = ''
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeDropDown = this.handleChangeDropDown.bind(this)
    this.clearState = this.clearState.bind(this)
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
    console.log(project)
    console.log(client)
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
      }, () => {
        console.log(this.state.expenses),
        console.log(this.state.suppliers),
        console.log(this.state.projects)
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
    console.log(length)
    let sum = 0
    for (let i=0; i<length; i++) {
      sum += array[i].amount
    }
    return sum
  }


  render() {
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

        <form className="update" onSubmit={this.handleSubmit}>
          <h3 className="title">New Expense</h3>

          <div className="select">
            <select
              name="supplier_id"
              defaultValue={this.default}
              onChange={this.handleChange}>
              <option disabled value="default">Select supplier</option>
              {this.state.suppliers && this.state.suppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.name}</option>
              ))}
            </select>
          </div>


          <div className="select">
            <select
              name="project_id"
              defaultValue={this.default}
              onChange={this.handleChangeDropDown}>
              <option disabled value="default">Select client: project</option>
              {this.state.projects && this.state.projects.map(project => (
                <option key={project.id} value={`${project.id}-${project.client.id}`}>{project.client.name}: {project.name}</option>
              ))}
            </select>
          </div>
          <br />
          <div>
            <input
              className={`input ${this.state.error ? 'is-danger': ''}`}
              name="description"
              placeholder="Expense decription"
              value={this.state.data.description}
              onChange={this.handleChange}
            />
          </div>
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
          {this.state.error && <small className="help is-danger">{this.state.error} </small>}
          <div>
            <button className="button">New Project &#x3E;</button>
          </div>
        </form>



      </main>
    )
  }
}

export default Expense

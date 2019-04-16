import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import SupplierHeader from './lists/supplierHeader'
import SupplierList from './lists/supplierList'
import SupplierSummary from './lists/supplierSummary'
import ModalSupplier from './modals/supplierModal'

class Suppliers extends React.Component {
  constructor() {
    super()
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
    axios.post('/api/suppliers', this.state.data,  { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.getData())
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Invalid Credentials'}, () => console.log('this.state', this.state))
      })
  }

  getData(){
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({ suppliers: res.data.suppliers }, () => console.log(this.state.suppliers)))
  }

  componentDidMount() {
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data)
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
        <div className="subHeader2">Suppliers</div>
        <div className = 'dataTable'>
          <SupplierHeader />
          {this.state.suppliers && this.state.suppliers.map(supplier => (
            <div key={supplier.id} className="lineItem">
              <SupplierList
                supplier={supplier}
              />
              <SupplierSummary
                totalExpenses={this.sumArray(supplier.expenses)}
              />
            </div>
          ))}
        </div>
        <button onClick={this.handleShow}>Add Supplier</button>

        <ModalSupplier show={this.state.modalShow} error={this.state.error} onHide={modalClose}/>

      </main>
    )
  }
}

export default Suppliers

              //
              // <ProjectSummary
              //   totalExpenses={this.sumArray(project.expenses)}
              //   comparator={this.comparator(project.expenses,project.invoices)}
              //   totalInvoiced={this.sumArray(project.invoices)}
              // />

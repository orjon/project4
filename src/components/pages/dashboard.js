import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import moment from 'moment'
import InvoiceList from './lists/InvoiceList'
import InvoiceHeader from './lists/InvoiceHeader'
import ReactChartkick, { LineChart, PieChart } from 'react-chartkick'
import Chart from 'chart.js'

ReactChartkick.addAdapter(Chart)

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
      },
      error: ''
    }
    this.today = moment()
    this.userCurrent = ''
    this.chartData=[]
  }

  getData() {
    axios.get('/api/user', { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(res => this.setState({
        invoices: res.data.invoices,
        projects: res.data.projects,
        clients: res.data.clients
      }, () => this.collectChartData(this.state.projects)))
      .catch(err => console.log(err))
  }

  checkPaid(invoice) {
    if (invoice.date_paid) {
      console.log('PAID!')
    }
  }

  convertDates(invoice) {
    const dateDue = moment(invoice.date_due)
    const datePaid = invoice.date_paid ? moment(invoice.date_paid): 'not valid'
    console.log(dateDue.format('YYYY.MM.DD'))
    console.log(datePaid)
    const dueIn = this.today.diff(dateDue, 'days' )
    console.log(dueIn)
    // console.log()
  }

  collectChartData(array){
    const data = []
    const labels =[]
    const values =[]
    for (let i=0; i<array.length; i++) {
      labels[i]=array[i].name
      values[i]=0
      for (let j=0; j<array[i].invoices.length; j++ ){
        values[i]+=array[i].invoices[j].amount
      }
      data[i]=[labels[i],values[i]]
    }
    console.log(data)
    this.setState({chartData: data})
  }



  componentDidMount() {
    console.log('DASHBOARD')
    axios.get(`/api/user/${Auth.getPayload().sub}`)
      .then(res => this.userCurrent = res.data.username)
      .then(() => this.getData())
  }

  render() {
    return (
      <main className="section">
        <div className="subHeader2">Dashboard</div>
        <div className = 'dataTable'>
          <PieChart data={this.state.chartData} legend={'right'} />
          <InvoiceHeader />
          {this.state.invoices && this.state.invoices.map(invoice => (
            <div key={invoice.id} className='lineItem'>
              <InvoiceList
                invoice={invoice}
                today={this.today}
              />
            </div>
          ))}
        </div>
      </main>
    )
  }
}

export default Dashboard

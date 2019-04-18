import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'

import Nav from './components/common/nav'

import Register from './components/auth/register'
import Login from './components/auth/login'

import Home from './components/pages/home'
import Dashboard from './components/pages/dashboard'
import Projects from './components/pages/projects'
import ProjectShow from './components/pages/projectShow'
import InvoiceShow from './components/pages/invoiceShow'
import ExpenseShow from './components/pages/expenseShow'
import ClientShow from './components/pages/clientShow'
import SupplierShow from './components/pages/supplierShow'
import Invoices from './components/pages/invoices'
import Clients from './components/pages/clients'
import Expenses from './components/pages/expenses'
import Suppliers from './components/pages/suppliers'

import './scss/style.scss'


class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <BrowserRouter>
        <div className='siteWrapper'>
          <Nav />
          <div className="bodyWrapper">
            <Switch>
              <Route path="/register" component={Register}/>
              <Route path="/login" component={Login}/>
              <Route exact path="/" component={Home} />
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/projects" component={Projects} />
              <Route path="/invoice/:id" component={InvoiceShow}/>
              <Route path="/project/:id" component={ProjectShow}/>
              <Route path="/expenses/:id" component={ExpenseShow} />
              <Route path="/client/:id" component={ClientShow}/>
              <Route path="/supplier/:id" component={SupplierShow} />
              <Route path="/invoices" component={Invoices} />
              <Route path="/clients" component={Clients} />
              <Route path="/expenses" component={Expenses} />
              <Route path="/suppliers" component={Suppliers} />
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    )
  }
}


ReactDOM.render(
  <App />,
  document.getElementById('root')
)

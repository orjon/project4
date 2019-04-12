import React from 'react'
import { Link, withRouter } from 'react-router-dom'

import Auth from '../../lib/auth'

class Nav extends React.Component {
  constructor() {
    super()
    this.state = {
    }
    this.logout = this.logout.bind(this)
  }


  logout() {
    Auth.logout()
    this.props.history.push('/')
  }

  render() {
    return (
      <nav className="navbar">
        <div>LOGO</div>
        {!Auth.isAuthenticated() && <Link to="/register" className="menuItem">\register</Link>}
        {!Auth.isAuthenticated() && <Link to="/login" className="menuItem">\login</Link>}
        {Auth.isAuthenticated() && <Link to="/dashboard" className="menuItem">\dashboard</Link>}
        {Auth.isAuthenticated() && <Link to="/projects" className="menuItem">\projects</Link>}
        {Auth.isAuthenticated() && <Link to="/invoices" className="menuItem">\invoices</Link>}
        {Auth.isAuthenticated() && <Link to="/expenses" className="menuItem">\expenses</Link>}
        {Auth.isAuthenticated() && <Link to="/clients" className="menuItem">\clients</Link>}
        {Auth.isAuthenticated() && <Link to="/suppliers" className="menuItem">\suppliers</Link>}
        {Auth.isAuthenticated() && <a className="menuItem" onClick={this.logout}>\logout</a>}
      </nav>
    )
  }
}

export default withRouter(Nav)

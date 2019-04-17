import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

import Auth from '../../lib/auth'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      data: { username: '',
        password: ''
      },
      error: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name, value }}) {
    const data = {...this.state.data, [name]: value }
    const error = ''
    this.setState({ data, error })
  }

  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/login', this.state.data)
      .then(res => {
        Auth.setToken(res.data.token)
        this.props.history.push('/projects')
      })
      .catch((err) => {
        console.log('the error is', err)
        this.setState({ error: 'Something went wrong...'}, () => console.log('this.state', this.state))
      })
  }


  render() {
    return (
      <main className="outsideBox">
         <div className='LoginContainer'>
          <div className="section">
            <div className="container">
              <form id='loginForm'
                className="update"
                onSubmit={this.handleSubmit}
              >
                <div className="columns">
                  <div className="column">
                    <h3 className="title is-4">Login</h3>
                  </div>
                </div>
                <div className="control has-icons-left has-icons-right">
                  <input
                    className={`input ${this.state.error ? 'is-danger': ''}`}
                    name="username"
                    placeholder="Username"
                    value={this.state.data.username}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-envelope"></i>
                  </span>
                </div>
                <br />

                <div className="control has-icons-left has-icons-right">
                  <input
                    className={`input ${this.state.error ? 'is-danger': ''}`}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={this.state.data.password}
                    onChange={this.handleChange}
                  />
                  <span className="icon is-small is-left">
                    <i className="fas fa-key"></i>
                  </span>
                </div>
                <br />
                {this.state.error && <small className="help is-danger">{this.state.error} </small>}
              </form>
              <div className='columns'>
                <div className = 'ticks'>
                  <div className= 'icons'>
                    <button className='icon' form="loginForm">
                      <img alt='edit'
                        src='http://www.orjon.com/dev/project4/iconAddCircle.png'
                        width='50'
                        height='50' />
                    </button>
                  </div>
                </div>

                <Link to="/register">
                  <div className= 'icons'>
                    <button className='icon' >
                      <img alt='edit'
                        src='http://www.orjon.com/dev/project4/iconEditCircle.png'
                        width='50'
                        height='50' />
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>







    )
  }
}
export default Login

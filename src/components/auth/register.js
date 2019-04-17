import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'
import { Link } from 'react-router-dom'


class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        username: '',
        email: '',
        password: '',
        password_confirmation: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange({ target: { name , value }}) {
    const data = {...this.state.data, [name]: value}
    const errors = {...this.state.errors, [name]: ''}
    this.setState({ data, errors })
  }


  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/register', this.state.data, { headers: { Authorization: `Bearer ${Auth.getToken()}`}})
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({errors: err.response.data.errors}))
  }


  render() {
    return (
      <main>
      <br /><br /><br /><br /><br /><br /><br /><br />
        <div className= 'flex1'>

            <h3>Register...</h3>
            <form onSubmit={this.handleSubmit} id='signup'>


                <div>
                    <input
                      className={`input ${this.state.errors.username ? 'is-danger': ''}`}
                      name="username"
                      placeholder="* Username"
                      value={this.state.data.username}
                      onChange={this.handleChange}
                    />


                  {this.state.errors.username && <small className="help is-danger">Username is Required</small> }
                </div>

                <div>
                  <input
                    className={`input ${this.state.errors.email ? 'is-danger': ''}`}
                    name="email"
                    placeholder="*Email address"
                    value={this.state.data.email}
                    onChange={this.handleChange}
                  />

                  {this.state.errors.email && <small className="help is-danger">Email is Required</small> }
                </div>



              <br />

                <div>
                  <input
                    className={`input ${this.state.errors.password ? 'is-danger': ''}`}
                    name="password"
                    type="password"
                    placeholder="*Password"
                    value={this.state.data.password}
                    onChange={this.handleChange}
                  />

                {this.state.errors.password && <small className="help is-danger">Password is Required</small> }
                </div>
                <div>

                  <input
                    className={`input ${this.state.errors.password_confirmation ? 'is-danger': ''}`}
                    name="password_confirmation"
                    type="password"
                    placeholder="*Password Confirmation"
                    value={this.state.data.password_confirmation}
                    onChange={this.handleChange}
                  />

                {this.state.errors.password_confirmation && <small className="help is-danger">Passwords must match</small> }
                </div>
            </form>
            <br />
              <div className= 'regicon'>
              <button className='icon'>
                <Link to='/'>
                <img alt='edit'
                  src='http://www.orjon.com/dev/project4/iconDeleteCircle.png'
                  width='50'
                  height='50'/></Link>
              </button>
                <button className='icon' form='signup'>
                  <img alt='edit'
                    src='http://www.orjon.com/dev/project4/iconLogin.png'
                    width='50'
                    height='50' />
                </button>

              </div>
          </div>
      </main>
    )
  }
}
export default Register

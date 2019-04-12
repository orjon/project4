import React from 'react'
import axios from 'axios'


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
    axios.post('/api/register', this.state.data)
      .then(() => this.props.history.push('/login'))
      .catch(err => this.setState({errors: err.response.data.errors}))
  }


  render() {
    return (
      <main className="section">
        <div className="container">
          <h3>Register new user</h3>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                className={`input ${this.state.errors.username ? 'is-danger': ''}`}
                name="username"
                placeholder="* Username"
                value={this.state.data.username}
                onChange={this.handleChange}
              />
            </div>
            {this.state.errors.username && <small className="help is-danger">Username is Required</small> }
            <br />

            <div>
              <input
                className={`input ${this.state.errors.email ? 'is-danger': ''}`}
                name="email"
                placeholder="*Email address"
                value={this.state.data.email}
                onChange={this.handleChange}
              />
            </div>
            {this.state.errors.email && <small className="help is-danger">Email is Required</small> }
            <br />

            <div className="columns">
              <div className="column is-half">
                <input
                  className={`input ${this.state.errors.password ? 'is-danger': ''}`}
                  name="password"
                  type="password"
                  placeholder="*Password"
                  value={this.state.data.password}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.password && <small className="help is-danger">Password is Required</small> }
              <br />

              <div className="column is-half">
                <input
                  className={`input ${this.state.errors.password_confirmation ? 'is-danger': ''}`}
                  name="password_confirmation"
                  type="password"
                  placeholder="*Password Confirmation"
                  value={this.state.data.password_confirmation}
                  onChange={this.handleChange}
                />
              </div>
              {this.state.errors.password_confirmation && <small className="help is-danger">Passwords must match</small> }
            </div>

            <div>
              <button className="button is-success is-pulled-right">Join now</button>
            </div>

          </form>
        </div>
      </main>
    )
  }
}
export default Register

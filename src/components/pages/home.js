import React from 'react'
import axios from 'axios'
import Auth from '../../lib/auth'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  componentDidMount() {
    axios.get('/api/projects')
      .then(res => this.setState({ projects: res.data }))
  }

  render() {
    return (
      <div>
        <h1>project4</h1>
      </div>
    )
  }
}

export default Home

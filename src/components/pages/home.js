import React from 'react'
import { Link } from 'react-router-dom'

class Home extends React.Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    return (
      <div className='welcome'>
        <h1><Link to='/login' className='welcomeText'>welcome...</Link></h1>
      </div>
    )
  }
}

export default Home

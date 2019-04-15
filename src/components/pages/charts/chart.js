import React from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'

class Chart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chartData: props.chartData
    }
  }

  
  //   this.chartData = this.state.charData
  //
  //
  // }
  //
  // handleChange({ target: { name, value }}) {
  //   const chartData = {...this.state.chartData, this.props.chartData, this.props.chartVlaues}
  //   const error = ''
  //   this.setState({ data, error })
  // }
  //
  //
  //
  // handleChange({ target: { name, value }}) {
  //   const data = {...this.state.data, [name]: value }
  //   const error = ''
  //   this.setState({ data, error })
  // }


  render(){
    return(

      <div className='chart'>
      CHART COMPONENT
        <Pie
          data={this.state.chartData}
          width={100}
          height={50}
          options={{maintainAspectRation: false}}
        />
      </div>

    )
  }
}
export default Chart

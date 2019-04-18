import React from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'

class Chart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chartData: props.chartData
    }
  }



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

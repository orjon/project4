import React from 'react'
import {Bar, Line, Pie} from 'react-chartjs-2'

class Chart extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      chartData: props.chartData
    }
  }




const SimplePieChart = React.createClass({
	render () {
    const { PieChart, Pie, Sector, Cell } = Recharts;
    const data = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                      {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
     	const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
      const x  = cx + radius * Math.cos(-midAngle * RADIAN);
      const y = cy  + radius * Math.sin(-midAngle * RADIAN);

      return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
        	{`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    };


  	return (
    	<PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
        <Pie
          data={data}
          cx={300}
          cy={200}
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
        >
        	{
          	data.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
          }
        </Pie>
      </PieChart>
    );
  }
})

export default SimplePieChart

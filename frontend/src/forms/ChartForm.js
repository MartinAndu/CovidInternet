import React, { useState } from 'react'
import { Chart } from "react-google-charts";



const ChartForm = props => {

	const data=[
	  ['Year', 'Sales', 'Expenses', 'Profit'],
	  ['2014', 1000, 400, 200],
	  ['2015', 1170, 460, 250],
	  ['2016', 660, 1120, 300],
	  ['2017', 1030, 540, 350],
	]

   const initialOptions = {
	  title: "Age vs. Weight comparison",
	// Material design options
	chart: {
	  title: 'Company Performance',
	  subtitle: 'Sales, Expenses, and Profit: 2014-2017',
	},
	  legend: "none"
   };
/*   
   const margin = {top: 20, right: 20, bottom: 30, left: 40}
  	
   const [width, setOptions] = useState(initialOptions)

    const componentDidMount = event => {
    	window.onresize = () => {
    	  setWidth ({width: this.refs.root.offsetWidth}); 
    	};

    }

    const handleInputChange = event => {
		const { element, id } = event.target
	    console.log(`The bin ${element.text} with id ${id} was clicked`);
  	}
*/
    return (
    	<Chart
    	  chartType="Bar"
    	  data={data}
    	  options={initialOptions}
    	  loader={<div>Loading Chart</div>}
    	  width={'500px'}
    	  height={'300px'}
    	  legendToggle
    	/>
    )
}

export default ChartForm
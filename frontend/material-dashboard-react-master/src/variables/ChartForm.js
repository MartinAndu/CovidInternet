import React, { useState , useImperativeHandle} from 'react'
import { Chart } from "react-google-charts";



const ChartForm = React.forwardRef((props,ref) => {

  const data = null
  /*const data = [
    ["Consumo por Mes","VIDEO STREAMING", "HTTP WEB", "GAMING", "SOCIAL", "FILE SHARING", "MARKETPLACE", "SECURITY AND VPN", "MESSAGING", "CLOUD", "AUDIO STREAMING"],
    ["Mes de consumo normal",11534400, 2518344, 1537920, 1172664, 807408, 499824, 307584, 307584, 269136, 768960]
    ["Mes con covid",11534400, 2518344, 1537920, 1172664, 807408, 499824, 307584, 307584, 269136, 768960]
  ]*/
	/*const data= [
	  ['Year', 'Sales', 'Expenses', 'Profit'],
	  ['2014', 1000, 400, 200],
	  ['2015', 1170, 460, 250],
	  ['2016', 660, 1120, 300],
	  ['2017', 1030, 540, 350],
	]*/

  const [realData, setRealData] = useState(data);


  useImperativeHandle(ref, (data) => ({
    updateData(data)  {
      var result = []
      result.push(["Consumo por Mes",...data["normal"][1]])
      result.push(["Mes de consumo normal",...data["normal"][0]])

      data["normal"][1].forEach((value,key) => {
        if (data["aumento_covid"][1].indexOf(value) ==-1){
          data["aumento_covid"][0].splice(key, 0, 0)
        }
      })

      console.log(data["aumento_covid"][0])
      result.push(["Mes con covid",...data["aumento_covid"][0]])


      console.log("Dato", result);
      setRealData(result)     
    }
  }));

  
   const initialOptions = {
     width: 600,
     height: 400,
     bar: { groupWidth: '95%' },
	   title: "Servicios consumidos por el usuario",
	   legend: "none"
   };


   
/*   const margin = {top: 20, right: 20, bottom: 30, left: 40}
  	
   const [width, setOptions] = useState(initialOptions)

    const componentDidMount = event => {
    	window.onresize = () => {
    	  setWidth ({width: this.refs.root.offsetWidth}); 
    	};

    }

    const handleInputChange = event => {
		const { element, id } = event.target
	    console.log(`The bin ${element.text} with id ${id} was clicked`);
  	}*/

    if (realData != null) {
      console.log("sdsd")
    return (
    	<Chart
    	  chartType="Bar"
    	  data={realData}
    	  options={{initialOptions}}
    	  loader={<div>Loading Chart</div>}
    	  width={'600px'}
    	  height={'300px'}
    	  legendToggle
    	/>
    )


    }
/*    return (
      <Chart
  width={'500px'}
  height={'300px'}
  chartType="BarChart"
  loader={<div>Loading Chart</div>}
  data={[
    [
      'Element',
      'Density',
      { role: 'style' },
      {
        sourceColumn: 0,
        role: 'annotation',
        type: 'string',
        calc: 'stringify',
      },
    ],
    ['HTTP WEB', 2518344, '#b87333', null],
    ['GAMING', 1537920, 'silver', null]
  ]}
  options={{
    title: 'Density of Precious Metals, in g/cm^3',
    width: 600,
    height: 400,
    bar: { groupWidth: '95%' },
    legend: { position: 'none' },
  }}
  // For tests
  rootProps={{ 'data-testid': '6' }}
/>


    )*/
})

export default ChartForm
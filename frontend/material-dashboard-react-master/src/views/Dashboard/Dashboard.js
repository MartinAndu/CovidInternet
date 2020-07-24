import React, { useState, useEffect, useRef } from 'react'
import csv from 'csv';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Accessibility from "@material-ui/icons/Accessibility";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Danger from "components/Typography/Danger.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ReactFileReader from 'react-file-reader'
import ChartForm from "variables/ChartForm"

import { bugs, website, server } from "variables/general.js";
// import {MDCIconButtonToggle} from '@material/icon-button';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

// const iconToggle = new MDCIconButtonToggle(document.querySelector('.mdc-icon-button'));
// const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

const Dashboard = props =>  {

  const classes = useStyles();
  const parametros = {}
  const [realClasses, setClasses] = useState(parametros);

  const [jsonData, setJsonData] = useState(null);


  const childChartForm = useRef(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const initialFormState = { id : null, name: '', username: ''}
  const [user, setUser] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name] : value})
  }

  const formatJson = data => {
    let param = {}
    param["services"] = []
    param["weights"] = {}
    param["values"] = {}
    param["parameters"] = {}

    let columna = (data[0]).slice()
    let datos = data.slice(1)

    datos.map( (value, key) => {
      var service = value[columna.indexOf("service")];
      param["services"].push(service)
      param["weights"][service] = value[columna.indexOf("weight")]
      param["values"][service] = value[columna.indexOf("values")]
    })

    param["parameters"]["avg_mbps_monthly"] = data[1][columna.indexOf("avg_mbps_monthly")]
    param["parameters"]["avg_use"] = data[1][columna.indexOf("avg_use")]
    param["parameters"]["max_cap_tb"] = data[1][columna.indexOf("max_cap_tb")]
    param["parameters"]["increase_covid"] = data[1][columna.indexOf("increase_covid")]

    return param
  }

  const handleFiles = files => {
      var reader = new FileReader();
      reader.onload = function(e) {

        console.log(childChartForm);
        csv.parse(reader.result, (err, data) => {
            
          let param = formatJson(data)
          let jsonData = JSON.stringify(param)
           const requestOptions = {
            method : 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: jsonData
           }

          parametros["uso_promedio_mb"] = data[1][3] // Uso promedio Mb/s
          parametros["uso_promedio_hs"] = data[1][4] // Uso promedio Hs
          parametros["TB"] = data[1][5] // Maxima capacidad Tb
          parametros["incremento_covid"] = data[1][6] * 100 - 100 // Incremento Covid

          setJsonData(jsonData)
          setClasses(parametros)
          fetch("/getJson", requestOptions)
            .then(res => res.json())
            .then(
              (result) => {
                setIsLoaded(true);

                childChartForm.current.updateData(result)

                console.log(result)
                setItems(result.items);
              },
              // Nota: es importante manejar errores aquí y no en 
              // un bloque catch() para que no interceptemos errores
              // de errores reales en los componentes.
              (error) => {
                setIsLoaded(true);
                setError(error);
              }
            )

         });
      }
      reader.readAsText(files[0]);
  }


  const saveFiles = files => { 

      const requestOptions = {
       method : 'Post',
       headers: { 'Content-Type': 'application/json' },
       body: jsonData
      }

      fetch("/saveJson", requestOptions)
        .then(res => res.json())
        .then(
          (result) => {
            console.log(result);  
          },
          // Nota: es importante manejar errores aquí y no en 
          // un bloque catch() para que no interceptemos errores
          // de errores reales en los componentes.
          (error) => {
            setIsLoaded(true);
            setError(error);
          }
        ) 
  }

  useEffect(() => {
    console.log('Bienvenido a Internet Solidario');
  }, [])

  return (
     <div>
       <GridContainer>
         <GridItem xs={12} sm={6} md={3}>
           <Card>
             <CardHeader color="warning" stats icon>
               <CardIcon color="warning">
                 <Icon>content_copy</Icon>
               </CardIcon>
               <p className={classes.cardCategory}>Capacidad TB/mes</p>
               <h3 className={classes.cardTitle}>
                 {realClasses["TB"]}<small>TB/mes</small>
               </h3>
             </CardHeader>
             <CardFooter stats>
               <div className={classes.stats}>
                 <Danger>
                   <Warning />
                 </Danger>
                 <a href="#pablo" onClick={e => e.preventDefault()}>
                   Get more space
                 </a>
               </div>
             </CardFooter>
           </Card>
         </GridItem>
         <GridItem xs={12} sm={6} md={3}>
           <Card>
             <CardHeader color="success" stats icon>
               <CardIcon color="success">
                 <Store />
               </CardIcon>
               <p className={classes.cardCategory}>Uso hs/dia</p>
               <h3 className={classes.cardTitle}>{realClasses["uso_promedio_hs"]} hs</h3>
             </CardHeader>
             <CardFooter stats>
               <div className={classes.stats}>
                 <DateRange />
                 Last 24 Hours
               </div>
             </CardFooter>
           </Card>
         </GridItem>
         <GridItem xs={12} sm={6} md={3}>
           <Card>
             <CardHeader color="danger" stats icon>
               <CardIcon color="danger">
                 <Icon>info_outline</Icon>
               </CardIcon>
               <p className={classes.cardCategory}>Incremento COVID</p>
               <h3 className={classes.cardTitle}>{realClasses["incremento_covid"]}%</h3>
             </CardHeader>
             <CardFooter stats>
               <div className={classes.stats}>
                 <LocalOffer />
                 Tracked from Github
               </div>
             </CardFooter>
           </Card>
         </GridItem>
         <GridItem xs={12} sm={6} md={3}>
           <Card>
             <CardHeader color="info" stats icon>
               <CardIcon color="info">
                 <Accessibility />
               </CardIcon>
               <p className={classes.cardCategory}>Uso promedio Mb/s</p>
               <h3 className={classes.cardTitle}>{realClasses['uso_promedio_mb']} Mb/s</h3>
             </CardHeader>
             <CardFooter stats>
               <div className={classes.stats}>
                 <Update />
                 Just Updated
               </div>
             </CardFooter>
           </Card>
         </GridItem>
       </GridContainer>
       <GridContainer>
         <GridItem xs={12} sm={12} md={4}>
          <ChartForm ref={childChartForm}/>
         </GridItem>
       </GridContainer>
       <GridContainer>
         <form> 

          <GridItem xs={6} sm={6} md={3}>
              <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
                <div className="mdc-touch-target-wrapper">
                  <button data-style type="button" >
                    <div className="mdc-button__ripple"></div>
                    <span className="mdc-button__label">Upload</span>
                    <div className="mdc-button__touch"></div>
                  </button>
                </div>
              </ReactFileReader>
          </GridItem >
          <GridItem xs={12} sm={6} md={3}>
           <div className="mdc-touch-target-wrapper">
             <button data-style className={jsonData} onClick={saveFiles} type="button" >
               <div className="mdc-button__ripple"></div>
               <span className="mdc-button__label">Guardar</span>
               <div className="mdc-button__touch"></div>
             </button>
            </div>
          </GridItem >

         </form>
       </GridContainer>
     </div>
    );
}

export default Dashboard
import React, { useState, useEffect, useRef } from 'react'

import ButtonAlert from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import csv from 'csv';

// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
// import Alert from "@material-ui/lab/Alert";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import Button from "components/CustomButtons/Button.js";
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
import Info from "components/Typography/Info.js";
import Card from "components/Card/Card.js";
import TableList from "views/TableList/TableList.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import ReactFileReader from 'react-file-reader'
import ChartForm from "variables/ChartForm"

import { bugs, website, server, services } from "variables/general.js";
// import {MDCIconButtonToggle} from '@material/icon-button';

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

services["weights"] = []
services["values"] = []
services["names"] = []
var indices = []

/*
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));*/
// const iconToggle = new MDCIconButtonToggle(document.querySelector('.mdc-icon-button'));
// const buttonRipple = new MDCRipple(document.querySelector('.mdc-button'));

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const Dashboard = props =>  {
  const classes = useStyles();
  const parametros = {}
  const [realClasses, setClasses] = useState(parametros);

  const [jsonData, setJsonData] = useState(null);
  const [open, setOpen] = useState(false);

  const childChartForm = useRef(0);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [visibilityState, setVisibility] = useState("visible");
  // const [backTable, setBackTable] = useState(null)
  
  const initialFormState = { id : null, name: '', username: ''}
  const [user, setUser] = useState(initialFormState)

  const handleInputChange = event => {
    const { name, value } = event.target

    setUser({ ...user, [name] : value})
  }




  useEffect(() => {
      console.log("useEffect")

    if (props.id != null && props.id != undefined) {
      setVisibility("hidden")
      fetch("/get/" +  props.id.dataId)
        .then(res => res.json())
        .then(
          (result) => {
            getData(result)
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
    }, [])


  const formatJson = data => {
    let param = {}
    param["services"] = []
    param["weights"] = {}
    param["values"] = {}
    param["parameters"] = {}

    let columna = (data[0]).slice()
    let datos = data.slice(1)

    services["weights"] = [];
    services["values"] = [];
    services["names"] = [];
    datos.map( (value, key) => {
      var service = value[columna.indexOf("service")];
      param["services"].push(service);
      let weight = value[columna.indexOf("weight")];
      let val = value[columna.indexOf("values")];
      services["weights"].push(weight);
      services["values"].push(val);
      services["names"].push(service);
      param["weights"][service] = (weight / 100) + "";
      param["values"][service] = val;
      indices.push(key)
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

        csv.parse(reader.result, (err, data) => {
            
          let param = formatJson(data)
          getData(param)

         });
      }
      reader.readAsText(files[0]);
  }

  const getData = param => {

    let jsonData = JSON.stringify(param)
     const requestOptions = {
      method : 'Post',
      headers: { 'Content-Type': 'application/json' },
      body: jsonData
     }

    parametros["uso_promedio_mb"] = param["parameters"]["avg_mbps_monthly"]// data[1][3] // Uso promedio Mb/s
    parametros["uso_promedio_hs"] = param["parameters"]["avg_use"] //data[1][4] // Uso promedio Hs
    parametros["TB"] = param["parameters"]["max_cap_tb"]// data[1][5] // Maxima capacidad Tb
    parametros["incremento_covid"] =  param["parameters"]["increase_covid"]// data[1][6]  // Incremento Covid

    console.log(jsonData);

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
            setOpen(true);
            document.location.href = "/admin/table"
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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };



  useEffect(() => {
    console.log('Bienvenido a Internet Solidario');
  }, [])


/*
  if (backTable) {
      console.log("Vuelvo a tablas");
      return <TableList/>;
  }
*/  
  /*
  <div>
     <div className={classes.root}>
       <Button variant="outlined" onClick={handleClick}>
         Open success snackbar
       </Button>
       <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
         <Alert onClose={handleClose} severity="success">
           This is a success message!
         </Alert>
       </Snackbar>
       <Alert severity="error">This is an error message!</Alert>
       <Alert severity="warning">This is a warning message!</Alert>
       <Alert severity="info">This is an information message!</Alert>
       <Alert severity="success">This is a success message!</Alert>
     </div>*/


  return (
    <div>
       <div className={classes.root}>
         {/*<Button variant="outlined" onClick={handleClick}>
           Open success snackbar
         </Button>*/}
         <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
           <Alert onClose={handleClose} severity="success">
             Se ha guardado con éxito!
           </Alert>
         </Snackbar>
       </div>
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
                <LocalOffer/>
                  Tb por mes
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
                 <LocalOffer />
                 Cantidad de horas de uso
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
                 Incremento aproximado de consumo 
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
                 <LocalOffer />
                 Promedio de Megabits por segundo consumido
               </div>
             </CardFooter>
           </Card>
         </GridItem>
       </GridContainer>
       <GridContainer>
         <GridItem xs={12} sm={12} md={6}>
           <CustomTabs
             title=""
             headerColor="primary"
             tabs={[
               {
                 tabName: "Servicios",
                 tabIcon: Cloud,
                 tabContent: (
                   <Tasks
                     checkedIndexes={[0, 3]}
                     tasksIndexes={indices}
                     tasks={{...services}}
                   />
                 )
               }
             ]}
           />
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
            <div className="mdc-touch-target-wrapper" style={{ display: "inline-flex" }}>
              <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'} >
                  <Button data-style type="button" style={{visibility: visibilityState, marginLeft: "auto" }} >
                    <div className="mdc-button__ripple"></div>
                    <span className="mdc-button__label">Upload</span>
                    <div className="mdc-button__touch"></div>
                  </Button>
              </ReactFileReader>
              <Button data-style className={jsonData} onClick={saveFiles} type="button"  style={{visibility: visibilityState}}>
                <div className="mdc-button__ripple"></div>
                <span className="mdc-button__label">Guardar</span>
                <div className="mdc-button__touch"></div>
              </Button>  
            </div>   
          </GridItem >

         </form>
       </GridContainer>
     </div>
    );
}

export default Dashboard
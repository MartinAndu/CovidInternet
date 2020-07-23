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

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

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

  const handleFiles = files => {
      var reader = new FileReader();
      reader.onload = function(e) {

        console.log(childChartForm);
        csv.parse(reader.result, (err, data) => {
           

           const requestOptions = {
            method : 'Post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
           }

          parametros["uso_promedio_mb"] = data[1][3] // Uso promedio Mb/s
          parametros["uso_promedio_hs"] = data[1][4] // Uso promedio Hs
          parametros["TB"] = data[1][5] // Maxima capacidad Tb
          parametros["incremento_covid"] = data[1][6] * 100 - 100 // Incremento Covid

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
          <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
              <button type="button" className='btn'>Upload</button>
          </ReactFileReader>
         </form>
       </GridContainer>
     </div>

  )
}

export default Dashboard





/*return (
     <div>
       <GridContainer>
         <GridItem xs={12} sm={6} md={3}>
           <Card>
             <CardHeader color="warning" stats icon>
               <CardIcon color="warning">
                 <Icon>content_copy</Icon>
               </CardIcon>
               <p className={classes.cardCategory}>Used Space</p>
               <h3 className={classes.cardTitle}>
                 49/50 <small>GB</small>
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
               <p className={classes.cardCategory}>Revenue</p>
               <h3 className={classes.cardTitle}>$34,245</h3>
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
               <p className={classes.cardCategory}>Fixed Issues</p>
               <h3 className={classes.cardTitle}>75</h3>
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
               <p className={classes.cardCategory}>Followers</p>
               <h3 className={classes.cardTitle}>+245</h3>
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
           <Card chart>
             <ChartForm ref={childChartForm}/>
             <CardHeader color="warning">
               <ChartistGraph
                 className="ct-chart"
                 data={emailsSubscriptionChart.data}
                 type="Bar"
                 options={emailsSubscriptionChart.options}
                 responsiveOptions={emailsSubscriptionChart.responsiveOptions}
                 listener={emailsSubscriptionChart.animation}
               />
             </CardHeader>
             <CardBody>
               <h4 className={classes.cardTitle}>Consumos Personales</h4>
               <p className={classes.cardCategory}>Last Campaign Performance</p>
             </CardBody>
             <CardFooter chart>
               <div className={classes.stats}>
                 <AccessTime /> campaign sent 2 days ago
               </div>
             </CardFooter>
           </Card>
         </GridItem>
         <GridItem xs={12} sm={12} md={4}>
           <Card chart>
             <CardHeader color="danger">
               <ChartistGraph
                 className="ct-chart"
                 data={completedTasksChart.data}
                 type="Line"
                 options={completedTasksChart.options}
                 listener={completedTasksChart.animation}
               />
             </CardHeader>
             <CardBody>
               <h4 className={classes.cardTitle}>Completed Tasks</h4>
               <p className={classes.cardCategory}>Last Campaign Performance</p>
             </CardBody>
             <CardFooter chart>
               <div className={classes.stats}>
                 <AccessTime /> campaign sent 2 days ago
               </div>
             </CardFooter>
           </Card>
         </GridItem>
       </GridContainer>
       <GridContainer>
         <GridItem xs={12} sm={12} md={6}>
           <CustomTabs
             title="Tasks:"
             headerColor="primary"
             tabs={[
               {
                 tabName: "Bugs",
                 tabIcon: BugReport,
                 tabContent: (
                   <Tasks
                     checkedIndexes={[0, 3]}
                     tasksIndexes={[0, 1, 2, 3]}
                     tasks={bugs}
                   />
                 )
               },
               {
                 tabName: "Website",
                 tabIcon: Code,
                 tabContent: (
                   <Tasks
                     checkedIndexes={[0]}
                     tasksIndexes={[0, 1]}
                     tasks={website}
                   />
                 )
               },
               {
                 tabName: "Server",
                 tabIcon: Cloud,
                 tabContent: (
                   <Tasks
                     checkedIndexes={[1]}
                     tasksIndexes={[0, 1, 2]}
                     tasks={server}
                   />
                 )
               }
             ]}
           />
         </GridItem>
         <form>
          <label>Name</label>
          <input type="text" name="name" value={user.name} onChange={handleInputChange} />
          <label>UserName</label>
          <input type="text" name="username" value={user.username} onChange={handleInputChange} />
          <button>Add new user</button>
          <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv'}>
              <button type="button" className='btn'>Upload</button>
          </ReactFileReader>
         </form>
         <GridItem xs={12} sm={12} md={6}>
           <Card>
             <CardHeader color="warning">
               <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
               <p className={classes.cardCategoryWhite}>
                 New employees on 15th September, 2016
               </p>
             </CardHeader>
             <CardBody>
               <Table
                 tableHeaderColor="warning"
                 tableHead={["ID", "Name", "Salary", "Country"]}
                 tableData={[
                   ["1", "Dakota Rice", "$36,738", "Niger"],
                   ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                   ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                   ["4", "Philip Chaney", "$38,735", "Korea, South"]
                 ]}
               />
             </CardBody>
           </Card>
         </GridItem>
       </GridContainer>
     </div>

  )*/


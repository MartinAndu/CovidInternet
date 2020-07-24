import React, { useState, useEffect, useRef } from 'react'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const TableList = props => {

  const useStyles = makeStyles(styles);


  const [dataTable, setDataTable] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);


  const classes = useStyles();

  useEffect(() => {
 
    fetch("/getAll")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);

          console.log(result)
          let data = []
          result.map( x => {
            let d = []
            d.push(x["doc_id"].toString())
            d.push(x["parameters"]["max_cap_tb"].toString())
            d.push(x["parameters"]["avg_mbps_monthly"].toString())
            d.push(x["parameters"]["avg_use"].toString())
            d.push(x["services"].toString())
            data.push(d)
          })
          setDataTable(data)
          
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
    }, [])


    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Historial de Consultas</h4>
              <p className={classes.cardCategoryWhite}>
                Historial con la consulta de consumos
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["Id", "Max Capacidad", "Mb/s", "Horas uso Promedio", "Servicios Consumidos"]}
                tableData={dataTable}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
}


export default TableList

/*
 [
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              ]*/
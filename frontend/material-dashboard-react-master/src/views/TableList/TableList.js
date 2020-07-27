import React, { useState, useEffect, useRef } from 'react'

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Button from "components/CustomButtons/Button.js";
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
  const [dataRefresh, setdataRefresh] = useState(null);
  const [dataDummy, setdataDummy] = useState(null);
  const [value, setValue] = useState("");
  const [visibilityState, setVisibility] = useState("visible");
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(null);


  const classes = useStyles();

  useEffect(() => {
    setVisibility("visible")
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
            d.push(x["parameters"]["max_cap_tb"].toString() + "Tb")
            d.push(x["parameters"]["avg_mbps_monthly"].toString() + "Mb/s")
            d.push(x["parameters"]["avg_use"].toString() + "Hs")
            d.push(x["services"].toString())
            d.push(JSON.stringify(x["values"]))
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

    function callback() {
      /*console.log("Parent Callback")
      setValue("1")*/
      console.log("Parent Callback");
      // setValue("1")
      setVisibility("hidden");
      // return <TableList/>;
    }


    const deleteAll = () => {
      console.log("Borrar historial");
      fetch("/deleteAll")
        .then(res => res.json())
        .then(
          (result) => {
            console.log("Borrado");
            console.log(result)
            document.location.href = "/admin/table"
            // setdataDummy(0);
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
                tableHead={["", "Id", "Max Capacidad", "Mb/s", "Horas uso Promedio", "Servicios Consumidos", "Valores"]}
                tableData={dataTable}
                onClick={callback}
              />
            </CardBody>
          </Card>
        </GridItem>
        <Button data-style type="button"  onClick={deleteAll} style={{visibility: visibilityState}}>
          <div className="mdc-button__ripple"></div>
          <span className="mdc-button__label">Borrar Historial</span>
          <div className="mdc-button__touch"></div>
        </Button>

      </GridContainer>
    );
}


export default TableList
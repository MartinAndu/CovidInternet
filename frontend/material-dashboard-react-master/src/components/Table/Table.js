import React, { useState } from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableList from "views/TableList/TableList.js";
import TableCell from "@material-ui/core/TableCell";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import { Redirect } from 'react-router-dom'
import Dashboard from "views/Dashboard/Dashboard"

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor , callback} = props;

  const [dataId, setDataId] = useState(null);
  const [backTable, setBackTable] = useState(null)

  const returnTableList = () => {
    document.location.href = "/admin/table"
  }

/*
  if (backTable) { 
    console.log("back page");
    return props.parentCallback();
    // document.location.href = "http://localhost:3000/admin/table"
  }*/
  if (backTable) {
    return <Table/>
  }

  if (dataId != null && !backTable) {
    console.log("entra");
    return (
      <div>
        <Dashboard id={{dataId}}>
         {/* <GridItem xs={6} sm={6} md={3}>
            <div className="mdc-touch-target-wrapper">
              <Button data-style type="button"  onClick={returnTableList}>
                <div className="mdc-button__ripple"></div>
                <span className="mdc-button__label">Volver</span>
                <div className="mdc-button__touch"></div>
              </Button>
            </div>
          </GridItem > */}
        </Dashboard>
        <Button data-style type="button"  onClick={returnTableList}>
          <div className="mdc-button__ripple"></div>
          <span className="mdc-button__label">Volver</span>
          <div className="mdc-button__touch"></div>
        </Button>
      </div>
    );
  }


  const loadDashboard = id => {
    console.log(props);
    props.onClick();
    setDataId(id);
  }

  console.log(props.tableData)
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} className={classes.tableBodyRow}>
                <TableCell data-button={props.tableData[key][0]} onClick={() => loadDashboard(props.tableData[key][0])} className="MuiButtonBase-root MuiButton-root MuiButton-text makeStyles-button-54 makeStyles-transparent-63 makeStyles-justIcon-70 makeStyles-buttonLink-71" tabIndex="0" type="button" aria-label="Dashboard">
                  <span className="MuiButton-label">
                    <svg className="MuiSvgIcon-root" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"></path>
                    </svg>
                    <div className="PrivateHiddenCss-mdUp-36">
                      <p className="makeStyles-linkText-73">Dashboard
                      </p>
                    </div>
                  </span>
                  <span className="MuiTouchRipple-root">
                  </span>
                </TableCell>
                {prop.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

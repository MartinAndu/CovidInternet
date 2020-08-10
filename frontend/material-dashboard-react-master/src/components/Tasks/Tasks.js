import  React , { useState, useEffect} from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import CustomInput from "components/CustomInput/CustomInput.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

// @material-ui/icons
import Edit from "@material-ui/icons/Edit";
import Close from "@material-ui/icons/Close";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/tasksStyle.js";

const useStyles = makeStyles(styles);

var divStyle={
  paddingTop: "50px" 
}


const Tasks = props =>  {
  const classes = useStyles();
  const [checked, setChecked] = React.useState([...props.checkedIndexes]);
  const [flagTasks, setFlagTasks] = useState(true)

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const handleToggle = value => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };
  const { tasksIndexes, tasks, rtlActive } = props;
  console.log(props);
  const tableCellClasses = classnames(classes.tableCell, {
    [classes.tableCellRTL]: rtlActive
  });
  // {inputProps={tasks["services"]["weights"][value]}}
  var inputProps = {};
  var indices = tasksIndexes.slice();
  inputProps["weights"] = [];
  inputProps["names"] = [];
  inputProps["values"] = [];

  tasks["weights"].map( (value, key) => {
    inputProps["weights"].push(value + "%")
  })


  tasks["names"].map( (value, key) => {
    inputProps["names"].push(value)
  })

  tasks["values"].map( (value, key) => {
    inputProps["values"].push(value)
  })



  return (
    <Table className={classes.table}>
      <TableBody>
        {indices.map(value => (
            <TableRow key={value} className={classes.tableRow}>
              <TableCell className={tableCellClasses}>
              </TableCell>
              <TableCell className={tableCellClasses}>
              <GridContainer>
                <GridItem xs={8} sm={4} md={5}>
                 <CustomInput
                  labelText="Nombre"
                  value= {inputProps["names"][value]}
                  disabled= {true}
                  id="postal-code"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                </GridItem>

                <GridItem xs={4} sm={4} md={5}>
                 <CustomInput
                  labelText="Porcentaje(peso)"
                  value= {inputProps["weights"][value]}
                  disabled= {true}
                  id="postal-code"
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                </GridItem>
                <GridItem xs={4} sm={4} md={2}>
                 <CustomInput
                  labelText="Valor"
                  value= {inputProps["values"][value]}
                  id="postal-code"
                  disabled= {true}
                  formControlProps={{
                    fullWidth: true
                  }}
                />
                </GridItem>
              </GridContainer>
              </TableCell>
              {
              // <TableCell className={classes.tableActions}>
              // <div style={divStyle} >
              //   <Tooltip
              //     id="tooltip-top"
              //     title="Editar Servicio"
              //     placement="top"
              //     classes={{ tooltip: classes.tooltip }}
              //   >
                
              //     <IconButton
              //       aria-label="Edit"
              //       className={classes.tableActionButton}
              //     >
              //       <Edit
              //         className={
              //           classes.tableActionButtonIcon + " " + classes.edit
              //         }
              //       />
              //     </IconButton>
              //   </Tooltip>
              //   </div>
              //   <div style={divStyle}>
              //     <Tooltip
              //       id="tooltip-top-start"
              //       title="Remover Servicio"
              //       placement="top"
              //       classes={{ tooltip: classes.tooltip }}
              //     >
              //       <IconButton
              //         aria-label="Close"
              //         className={classes.tableActionButton}
              //       >
              //         <Close
              //           className={
              //             classes.tableActionButtonIcon + " " + classes.close
              //           }
              //         />
              //       </IconButton>
              //     </Tooltip>
              //   </div>
              // </TableCell>
              }
            </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
Tasks.propTypes = {
  tasksIndexes: PropTypes.arrayOf(PropTypes.number),
  tasks: PropTypes.object,
  rtlActive: PropTypes.bool,
  checkedIndexes: PropTypes.array
};


export default Tasks
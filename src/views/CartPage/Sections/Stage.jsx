/**
 * @description The stage section for the cart page.
 * @author Mohammed Odunayo
 * @class Stage
 * @name Stage
 */

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridContainer from "../../../components/Grid/GridContainer.jsx";
import GridItem from "../../../components/Grid/GridItem.jsx";
import basicsStyle from "../../../assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import MinSearch from "../../../components/Search/MinSearch";
import CartTable from "../../../components/Table/CartTable";

class Stage extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      
    }
  }
  
  render() {
    const { classes, ...data } = this.props;

    const styles = {
      cols:{
        display: "block",
        marginBottom: "30px"
      },
      container:{
        padding: "0px 30px"
      },
      header:{
        borderBottom: "1px solid lightgray"
      },
      bigMore:{
        float: "right", fontSize: "0.4em"
      },
      smallMore:{
        float: "right",
        fontSize: "0.6em",
        marginTop: "-10px"
      }
    }

    return (
      <div className={classes.sections}>
        <div style={styles.container}>
          <div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={12}>
                <div style={styles.cols}>
                  <MinSearch location="stage"/>
                  <MinSearch location="sidebar"/>
                  <CartTable data={data} />
                </div>
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(basicsStyle)(Stage);

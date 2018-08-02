/**
 * @description The stage section for the vendor page.
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
import VendorView from "../../../components/VendorView/VendorView";
import MinSearch from "../../../components/Search/MinSearch";

class Stage extends React.Component {
  
  render() {
    const { classes, vendors } = this.props;

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
              <GridItem>
                <div style={styles.cols}>
                  <MinSearch location="stage"/>
                  <MinSearch location="sidebar"/>
                  <VendorView params={vendors}/>
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

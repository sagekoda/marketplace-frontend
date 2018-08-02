/**
 * @description The VendorView component which is the parent component for vendors.
 * @author Mohammed Odunayo
 * @class VendorView
 * @name VendorView
 */

import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { Hidden } from "@material-ui/core";

import basicsStyle from "../../assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import VendorGrid from "./VendorGrid.jsx";

class VendorView extends React.Component {
    render() {
        const { params } = this.props;

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
            fontSize: "0.5em",
            marginTop: "0px"
            },
            productArea:{
                padding: "30px 0px"
            }
        }

        return (
            <div>
                <Hidden smDown>
                    <h2 style={styles.header}>All Vendors</h2>
                </Hidden>
                <Hidden mdUp>
                    <h3 style={styles.header}>All Vendors</h3>
                </Hidden>
                <GridContainer style={styles.productArea}>
                    <GridItem>
                        <VendorGrid params={params}/>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
  }
  
  export default withStyles(basicsStyle)(VendorView);
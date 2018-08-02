/**
 * @description This is the parent component that control the brand view.
 * @author Mohammed Odunayo
 * @class BrandView
 * @name BrandView
 */

import React from "react";

import withStyles from "@material-ui/core/styles/withStyles";
import { Hidden } from "@material-ui/core";

import basicsStyle from "../../assets/jss/material-kit-react/views/componentsSections/basicsStyle.jsx";
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";
import BrandGrid from "./BrandGrid.jsx";

class BrandView extends React.Component {
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
                    <h2 style={styles.header}>All Brands</h2>
                </Hidden>
                <Hidden mdUp>
                    <h3 style={styles.header}>All Brands</h3>
                </Hidden>
                <GridContainer style={styles.productArea}>
                    <GridItem>
                        <BrandGrid params={params}/>
                    </GridItem>
                </GridContainer>
            </div>
        );
    }
  }
  
  export default withStyles(basicsStyle)(BrandView);
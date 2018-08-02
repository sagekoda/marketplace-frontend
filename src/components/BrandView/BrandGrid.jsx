/**
 * @description The brand grid view component which renders the brand grid view.
 * @author Mohammed Odunayo
 * @class BrandGrid
 * @name BrandGrid
 */

import React from "react";
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import { Button } from "@material-ui/core";
// core components
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";

const style = {
    ...imagesStyles,
    textMuted: {
      color: "#6c757d"
    },
    categoryCard: {
        overflow: "hidden"
    },
    cardBody: {
        transition: "background-color 0.6s, padding 0.6s",
        backgroundColor: "rgba(0,0,0,0)",
        paddingTop: "100%",
        "&:hover": {
            backgroundColor: "rgba(0,0,0,0.5)",
            paddingTop: "20px"
        }
    },
    cardTitle: {
        color: "#ffffff",
        fontWeight: "bold",
        Position: "relative",
        marginTop: "20%",
        textAlign: "center",
        textShadow: "2px 2px 5px black"
    },
    cardText: {
      color: "#ffffff",
      fontWeight: "bold",
      Position: "relative",
      marginTop: "-2%",
      textAlign: "center",
      textShadow: "2px 2px 5px black"
    },
    cardCon: {
        overflow: "hidden",
        margin: "0px"
    },
    cardButton: {
        padding: "0px",
        margin: "0px",
        marginBottom: "30px",
        fontWeight: "normal",
        width: "100%"
    }
  };

class BrandGrid extends React.Component {

    render() {
      const { classes, params } = this.props;
      
      return (
        <div>
            <GridContainer>
            {params.map((brand, index) => {
                return(
                    <GridItem xs={12} sm={6} md={4} lg={3} key={index} className={classes.scene}>
                        <Link to={"/brand/" + index} className={classes.card}>
                            <Button simple="true" className={classes.cardButton}>
                                <Card className={classes.cardCon}>
                                    <img className={classes.imgCardTop} src={brand.image} alt={brand.name} />
                                    <CardBody className={classes.imgCardOverlay+" "+classes.cardBody}>
                                        <h3 className={classes.cardTitle}>{brand.name}</h3>
                                    </CardBody>
                                </Card>
                            </Button>
                        </Link>
                    </GridItem>
                );
            })}
            </GridContainer>
        </div>
      );
    }
  }

  BrandGrid.prototypes = {
    classes: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  };

  export default withStyles(style)(BrandGrid);

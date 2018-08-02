/**
 * @description The category grid view component which renders the category grid view.
 * @author Mohammed Odunayo
 * @class CategoryGrid
 * @name CategoryGrid
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
    cardFoot: {
        backgroundColor: "#ffffff",
        padding: "20px",
        position: "relative",
        paddingTop: "0px"
    },
    cardCon: {
        overflow: "hidden",
        margin: "0px"
    },
    cardButton: {
        padding: "0px",
        marginBottom: "30px",
        fontWeight: "normal",
        width: "100%"
    },
    cardScreen: {
        width: "100%",
        height: "250px",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center"
    },
    scene: {
        perspective: "600px"
    },
    card: {
        transformStyle: "preserve-3d",
        transformOrigin: "center top",
        transition: "transform 0.5s",
        display: "block",
        "&:hover": {
            transform: "rotateX(8deg) rotateY(-8deg)",
            zIndex: "3000"
        }
    }
};

class CategoryGrid extends React.Component {

    render() {
      const { classes, params } = this.props;
      
      return (
        <div>
            <GridContainer>
            {params.map((category, index) => {
                return(
                    <GridItem xs={12} sm={6} md={4} lg={3} key={index} className={classes.scene}>
                        <Link to={"/category/" + index} className={classes.card}>
                            <Button simple="true" className={classes.cardButton}>
                                <Card className={classes.cardCon}>
                                    <div className={classes.cardScreen} style={{backgroundImage: `url('${category.image}')`}}></div>
                                    <CardBody className={classes.cardFoot}>
                                        <h3>{category.name}</h3>
                                        <p>{category.info}</p>
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

  CategoryGrid.prototypes = {
    classes: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  };

  export default withStyles(style)(CategoryGrid);

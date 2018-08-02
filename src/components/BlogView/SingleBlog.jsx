/**
 * @description Single blog view component.
 * @author Mohammed Odunayo
 * @class SingleBlog
 * @name SingleBlog
 */

import React from "react";
import PropTypes from 'prop-types';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Card from "../../components/Card/Card.jsx";
import CardBody from "../../components/Card/CardBody.jsx";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles.jsx";
import { cardTitle } from "../../assets/jss/material-kit-react.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import { primaryColor } from "../../assets/jss/material-kit-react";
import { Avatar } from "@material-ui/core";
import Button from "../../components/CustomButtons/Button.jsx";

const style = {
    ...imagesStyles,
    cardTitle,
    textMuted: {
      color: "#6c757d"
    },
    cardButton: {
        padding: "0px",
        margin: "0px",
        fontWeight: "normal",
        width: "100%"
    },
    cardCon: {
        overflow: "hidden",
        margin: "0px"
    },
    con: {
        margin: "50px 0px"
    },
    cardBody: {
        padding: 0,

    },
    cardText: {
        fontSize: "1.2em",
    },
    cardFootText: {
        fontSize: "1em",
        marginTop: "20px",
        paddingTop: "35px",
        marginBottom: "50px"
    },
    postButtonCon: {
        float: "right",
        marginTop: 14
    },
    avatar: {
      margin: "10px 10px 0px 0px",
      width: 70,
      height: 70,
      float: "left"
    }
  };

class SingleBlog extends React.Component {

    render() {
      const { classes } = this.props;
      
      return (
        <div>
            <GridContainer className={classes.con}>
                <GridItem lg={12} className={classes.scene}>
                    <Button simple className={classes.cardButton}>
                        <Card className={classes.cardCon}>
                            <img className={classes.imgCardTop}
                                src={require("../../assets/img/bg4.jpg")}
                                alt="Blog"
                            />
                        </Card>
                    </Button>
                </GridItem>
                <GridItem sm={12}>
                    <CardBody className={classes.cardBody}>
                        <Avatar
                            alt="User"
                            src={require("../../assets/img/faces/marc.jpg")}
                            className={classes.avatar}
                        />
                        <p className={classes.cardFootText}>
                            <strong style={{color: primaryColor}}>Author Name</strong>, Post Date
                        </p>
                        <p className={classes.cardText}>
                            Like so many organizations these days, Autodesk is a company in transition.
                            It was until recently a traditional boxed software company selling licenses.
                            Yet its own business model disruption is only part of the story — and
                        </p>
                        <p className={classes.cardText}>
                            Like so many organizations these days, Autodesk is a company in transition.
                            It was until recently a traditional boxed software company selling licenses.
                            Yet its own business model disruption is only part of the story — and
                        </p>
                        <p className={classes.cardText}>
                            Like so many organizations these days, Autodesk is a company in transition.
                            It was until recently a traditional boxed software company selling licenses.
                            Yet its own business model disruption is only part of the story — and
                        </p>
                        <p className={classes.cardText}>
                            Like so many organizations these days, Autodesk is a company in transition.
                            It was until recently a traditional boxed software company selling licenses.
                            Yet its own business model disruption is only part of the story — and
                        </p>
                        <p className={classes.cardText}>
                            Like so many organizations these days, Autodesk is a company in transition.
                            It was until recently a traditional boxed software company selling licenses.
                            Yet its own business model disruption is only part of the story — and
                        </p>
                    </CardBody>
                </GridItem>
            </GridContainer>
        </div>
      );
    }
  }

  SingleBlog.prototypes = {
    classes: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  };

  export default withStyles(style)(SingleBlog);

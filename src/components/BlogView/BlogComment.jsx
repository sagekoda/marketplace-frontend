/**
 * @description Comment section of a single blog view component.
 * @author Mohammed Odunayo
 * @class BlogComment
 * @name BlogComment
 */

import React from "react";
import PropTypes from 'prop-types';
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import CardBody from "../../components/Card/CardBody.jsx";
import imagesStyles from "../../assets/jss/material-kit-react/imagesStyles.jsx";
import { cardTitle } from "../../assets/jss/material-kit-react.jsx";
import GridContainer from "../Grid/GridContainer.jsx";
import GridItem from "../Grid/GridItem.jsx";
import { primaryColor } from "../../assets/jss/material-kit-react";
import { Avatar, Hidden } from "@material-ui/core";
import { Comment } from "@material-ui/icons";
import CustomInput from "../../components/CustomInput/CustomInput.jsx";
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
        fontSize: "1em",
    },
    cardFootText: {
        fontSize: "1em",
        marginTop: "10px",
        marginBottom: "10px"
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

class BlogComment extends React.Component {

    render() {
      const { classes } = this.props;
      
      return (
        <div>
            <GridContainer className={classes.con}>
                <GridItem lg={1} sm={2} xs={12}>
                    <Avatar
                        alt="User"
                        src={require("../../assets/img/faces/marc.jpg")}
                        className={classes.avatar}
                    />
                    <Hidden smUp>
                        <p className={classes.cardFootText} style={{marginTop: "30px"}}>
                            <strong style={{color: primaryColor}}>Author Name</strong>, Post Date
                        </p>
                    </Hidden>
                </GridItem>
                <GridItem lg={11} sm={10} xs={12}>
                    <CardBody className={classes.cardBody}>
                        <Hidden xsDown>
                            <p className={classes.cardFootText}>
                                <strong style={{color: primaryColor}}>Author Name</strong>, Post Date
                            </p>
                        </Hidden>
                        <p className={classes.cardText}>
                            Like so many organizations these days, Autodesk is a company in transition.
                            It was until recently a traditional boxed software company selling licenses.
                            Yet its own business model disruption is only part of the story — and
                        </p>
                    </CardBody>
                    <br/>
                    <br/>
                </GridItem>
                <GridItem sm={12}>
                <Avatar
                    alt="User"
                    src={require("../../assets/img/faces/marc.jpg")}
                    className={classes.avatar}
                />
                <h3>
                Post your comment here.
                </h3>
                <form>
                    <GridContainer>
                        <GridItem md={12}>
                            <CustomInput
                            labelText="Your Comment"
                            id="message"
                            formControlProps={{
                                fullWidth: true,
                                className: classes.textArea
                            }}
                            inputProps={{
                                multiline: true,
                                rows: 5
                            }}
                            />
                            <GridContainer justify="center">
                            <GridItem
                                xs={12}
                                className={classes.textCenter}
                            >
                                <Button round color="primary"><Comment /> Post Comment</Button>
                            </GridItem>
                            </GridContainer>
                        </GridItem>
                    </GridContainer>
                    </form>
                </GridItem>
            </GridContainer>
        </div>
      );
    }
  }

  BlogComment.prototypes = {
    classes: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  };

  export default withStyles(style)(BlogComment);

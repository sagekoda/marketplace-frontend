/**
 * @description The megaFooter component that render the big footer before the bottomFooter.
 * @author Mohammed Odunayo
 * @class MegaFooter
 * @name MegaFooter
 */

import React from "react";
// material-ui components
import withStyles from "@material-ui/core/styles/withStyles";
import {ArrowForward, Email, Home, Mail, Forward} from "@material-ui/icons";
import {DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Dialog, List, ListItem} from '@material-ui/core';

import Button from '../../components/CustomButtons/Button.jsx';
import GridContainer from "../../components/Grid/GridContainer.jsx";
import GridItem from "../../components/Grid/GridItem.jsx";

const style = {
    megaFoot: {
        padding: "90px 30px 30px 30px",
        marginTop: "-60px",
        borderBottom: "1px solid gray"
    },
    textCenter: {
        textAlign: "center"
    },
    footHead: {
        borderBottom: "1px solid lightgray"
    },
    footIcon: {
        fontSize: "4em"
    },
    link: {
        color: ""
    }
  };

class MegaFooter extends React.Component {
    state = {
        subOpen: false,
      };
    
      subClickOpen = () => {
        this.setState({ subOpen: true });
      };
    
      subClose = () => {
        this.setState({ subOpen: false });
      };

    render() {
        
        return (

        <GridContainer style={style.megaFoot} >
            <GridItem xs={12} sm={6} md={3}>
                <h2>Newsletter</h2>
                <h4 style={style.textCenter}>
                    <img src={require("../../assets/img/logo.png")} height="60" style={{marginTop: "-60px"}} alt="Logo" />&nbsp;
                    <Forward style={style.footIcon} />
                    <Mail style={style.footIcon} />
                    <br/>
                    Join our newsletter and get news in your inbox every week! We hate spam too, so no worries about this.
                    <Button style={{fontSize: "1.5em"}} fullWidth onClick={this.subClickOpen} color="primary">
                        Subscribe
                    </Button>
                </h4>
                <Dialog
                    open={this.state.subOpen}
                    onClose={this.subClose}
                    aria-labelledby="subscription-dialog"
                    >
                    <DialogTitle id="subscription-dialog">
                        <span color="primary"><Mail /> Subscribe To Newsletter</span>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                        Join our newsletter and get news in your inbox every week! We hate spam too, so no worries about this.
                        </DialogContentText>
                        <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        />
                    </DialogContent>
                    <DialogActions style={{margin: "0px 25px 30px 25px"}}>
                        <Button onClick={this.subClose} color="primary" simple size="lg">
                        Cancel
                        </Button>
                        <Button onClick={this.subClose} color="primary" size="lg">
                        Subscribe
                        </Button>
                    </DialogActions>
                    </Dialog>
            </GridItem>

            <GridItem xs={12} sm={6} md={3}>
            <h2>Categories</h2>
            <List>
                <ListItem style={{padding: "10px 0px"}}>
                <ArrowForward />&nbsp;
                <a
                    href="/category/automobile"
                    style={{color: "#3C4858", fontSize: "1.3em", display: "block", width: "100%"}}
                >
                    Automobile
                </a>
                </ListItem>
                <ListItem style={{padding: "10px 0px"}}>
                <ArrowForward />&nbsp;
                <a
                    href="/category/0"
                    style={{color: "#3C4858", fontSize: "1.3em", display: "block", width: "100%"}}
                >
                    Women Fashion
                </a>
                </ListItem>
                <ListItem style={{padding: "10px 0px"}}>
                <ArrowForward />&nbsp;
                <a
                    href="/category/1"
                    style={{color: "#3C4858", fontSize: "1.3em", display: "block", width: "100%"}}
                >
                    Men Fashion
                </a>
                </ListItem>
                <ListItem style={{padding: "10px 0px"}}>
                <ArrowForward />&nbsp;
                <a
                    href="/category/web-development"
                    style={{color: "#3C4858", fontSize: "1.3em", display: "block", width: "100%"}}
                >
                    Web Development
                </a>
                </ListItem>
            </List>
            </GridItem>

            <GridItem xs={12} sm={6} md={3}>
            <h2>Useful Links</h2>
            <List>
                <ListItem style={{padding: "10px 0px"}}>
                <ArrowForward />&nbsp;
                <a
                    href="/"
                    style={{color: "#3C4858", fontSize: "1.3em", display: "block", width: "100%"}}
                >
                    Home
                </a>
                </ListItem>
                <ListItem style={{padding: "10px 0px"}}>
                <ArrowForward />&nbsp;
                <a
                    href="/products"
                    style={{color: "#3C4858", fontSize: "1.3em", display: "block", width: "100%"}}
                >
                    All Products
                </a>
                </ListItem>
                <ListItem style={{padding: "10px 0px"}}>
                <ArrowForward />&nbsp;
                <a
                    href="/products/featured"
                    style={{color: "#3C4858", fontSize: "1.3em", display: "block", width: "100%"}}
                >
                    Featured Products
                </a>
                </ListItem>
                <ListItem style={{padding: "10px 0px"}}>
                <ArrowForward />&nbsp;
                <a
                    href="/contact"
                    style={{color: "#3C4858", fontSize: "1.3em", display: "block", width: "100%"}}
                >
                    Contact Us
                </a>
                </ListItem>
                <ListItem style={{padding: "10px 0px"}}>
                <ArrowForward />&nbsp;
                <a
                    href="/faq"
                    style={{color: "#3C4858", fontSize: "1.3em", display: "block", width: "100%"}}
                >
                    FAQ
                </a>
                </ListItem>
            </List>
            </GridItem>

            <GridItem xs={12} sm={6} md={3}>
                <h2>Contact Us</h2>
                <Home />&nbsp;<span style={{color: "#3C4858", fontSize: "1.3em", fontWeight: "bolder", width: "100%"}}>Address:</span>
                <h4>71-75 shelton United Kingdom</h4>
                <Email />&nbsp;<span style={{color: "#3C4858", fontSize: "1.3em", fontWeight: "bolder", width: "100%"}}>Email:</span>
                <a href="mailto:research@bezop.io" style={{color: "#3C4858", fontSize: "1.3em", display: "block", width: "100%"}}>research@bezop.io</a>
                <br/>
                <a href="http://facebook.com/groups/bezop">
                    <Button color="facebook" justIcon><i className={ " fab fa-facebook"} /></Button>
                </a>
                <a href="http://twitter.com/bezopNetwork">
                    <Button color="twitter" justIcon><i className={ " fab fa-twitter"} /></Button>
                </a>
                <a href="https://beta.bezop.io/">
                    <Button color="google" justIcon><i className={ " fab fa-google"} /></Button>
                </a>
                <a href="https://beta.bezop.io/">
                    <Button color="github" justIcon><i className={ " fab fa-github"} /></Button>
                </a>
            </GridItem>
        </GridContainer>

        );
    }
}

export default withStyles(style)(MegaFooter);
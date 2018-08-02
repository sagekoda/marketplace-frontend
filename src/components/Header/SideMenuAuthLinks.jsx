/**
 * @description The component responsible for rendering the responsive header menus.
 * @author Mohammed Odunayo
 * @class SideMenuAuthLinks
 * @name SideMenuAuthLinks
 */

import React from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {List, ListItem, Collapse} from "@material-ui/core";
import {ExpandLess, ExpandMore} from '@material-ui/icons';

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import {userIs} from "../Auth/AccessControl.jsx";

class SideMenuAuthLinks extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      loginOpen: false,
      signUpOpen: false,
    };

    this.events = this.props.events;
  }

  handleLogin = () => {
    this.setState(state => ({ loginOpen: !state.loginOpen }));
  };

  handleSignUp = () => {
    this.setState(state => ({ signUpOpen: !state.signUpOpen }));
  };

  render() {
    const { classes, users } = this.props;

  return (
    <span>
          {(!userIs([users]))?
            <span>
              <ListItem className={classes.listItem} onClick={this.handleLogin}>
                <Link to="#login" className={classes.navLink} color="transparent">
                  Login {this.state.loginOpen ? <ExpandLess /> : <ExpandMore />}
                </Link>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Collapse in={this.state.loginOpen} timeout="auto" unmountOnExit color="transparent">
                  <List component="div" style={{marginLeft: "30px"}}>
                    <ListItem button className={classes.nested}>
                      <a
                        className={classes.dropdownLink}
                        onClick={() => {
                          this.events.emit("usersLogin", "Customer");
                        }}
                      >
                        Customer Login
                      </a>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <a
                        className={classes.dropdownLink}
                        onClick={() => {
                          this.events.emit("usersLogin", "Vendor");
                        }}
                      >
                        Vendor Login
                      </a>
                    </ListItem>
                  </List>
                </Collapse>
              </ListItem>
              <ListItem className={classes.listItem} onClick={this.handleSignUp}>
                <Link to="#register" className={classes.navLink} color="primary">
                  Sign Up {this.state.signUpOpen ? <ExpandLess /> : <ExpandMore />}
                </Link>
              </ListItem>
              <ListItem className={classes.listItem}>
                <Collapse in={this.state.signUpOpen} timeout="auto" unmountOnExit color="transparent">
                  <List component="div" style={{marginLeft: "30px"}}>
                    <ListItem button className={classes.nested}>
                      <a
                        className={classes.dropdownLink}
                        onClick={() => {
                          this.events.emit("usersSignUp", "Customer");
                        }}
                      >
                        Customer Sign Up
                      </a>
                    </ListItem>
                    <ListItem button className={classes.nested}>
                      <a
                        className={classes.dropdownLink}
                        onClick={() => {
                          this.events.emit("usersSignUp", "Vendor");
                        }}
                      >
                        Vendor Sign Up
                      </a>
                    </ListItem>
                  </List>
                </Collapse>
              </ListItem>
            </span>
          :
            null
          }
    </span>
  );
}
}

export default withStyles(headerLinksStyle)(SideMenuAuthLinks);

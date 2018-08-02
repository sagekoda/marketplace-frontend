/**
 * @description The component responsible for rendering the responsive header menus.
 * @author Mohammed Odunayo
 * @class HeaderLinks
 * @name HeaderLinks
 */

import React from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {List, ListItem, Collapse, Avatar} from "@material-ui/core";
import {ExpandLess, ExpandMore, AccountCircle, PowerSettingsNew} from '@material-ui/icons';

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import {userIs} from "../Auth/AccessControl.jsx";

class HeaderLinks extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      accountOpen: false,
    };

    this.events = this.props.events;
  }

  handleAccount = () => {
    this.setState(state => ({ accountOpen: !state.accountOpen }));
  };

  getUserAvatar = (classes, users) => {

    switch(users){

      case 'customer':
        return(<span>
        <ListItem className={classes.listItem} onClick={this.handleAccount}>
          <a className={classes.navLink} color="transparent" >
            <Avatar alt="User Avatar" src={require('../../assets/img/faces/marc.jpg')} style={{marginRight: "10px"}} />
            <span style={{marginTop: "8px"}}>Account
            {this.state.accountOpen ? <ExpandLess style={{marginBottom: "-8px"}} /> : <ExpandMore style={{marginBottom: "-8px"}} />}</span>
          </a>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Collapse in={this.state.accountOpen} timeout="auto" unmountOnExit color="transparent">
            <List component="div" style={{marginLeft: "30px"}}>
              <ListItem button className={classes.nested}>
                <Link to="/profile" className={classes.dropdownLink}><AccountCircle style={{marginBottom: "-8px"}} /> My Profile</Link>
              </ListItem>
              <ListItem button className={classes.nested}>
                <a onClick={() => this.events.emit("usersLogOut", "customer")} className={classes.dropdownLink}><PowerSettingsNew style={{marginBottom: "-8px"}} /> Logout</a>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
        </span>);

      case 'vendor':
        return(<span>
          <ListItem className={classes.listItem} onClick={this.handleAccount}>
            <a className={classes.navLink} color="transparent" >
              <Avatar alt="User Avatar" src={require('../../assets/img/faces/marc.jpg')} style={{marginRight: "10px"}} />
              <span style={{marginTop: "8px"}}>Account
              {this.state.accountOpen ? <ExpandLess style={{marginBottom: "-8px"}} /> : <ExpandMore style={{marginBottom: "-8px"}} />}</span>
            </a>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Collapse in={this.state.accountOpen} timeout="auto" unmountOnExit color="transparent">
              <List component="div" style={{marginLeft: "30px"}}>
                <ListItem button className={classes.nested}>
                  <Link to="/dashboard" className={classes.dropdownLink}><AccountCircle style={{marginBottom: "-8px"}} /> My Profile</Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <a onClick={() => this.events.emit("usersLogOut", "customer")} className={classes.dropdownLink}><PowerSettingsNew style={{marginBottom: "-8px"}} /> Logout</a>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
          </span>);

      default:
      return null;
    }
  };

  render() {
    const { classes, users } = this.props;

    const userAvatar = (userIs([users]))? this.getUserAvatar(classes, users) : null;

  return (
    <span>
      {userAvatar}
    </span>
  );
}
}

export default withStyles(headerLinksStyle)(HeaderLinks);

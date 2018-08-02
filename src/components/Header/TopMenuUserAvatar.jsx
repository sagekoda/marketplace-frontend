/**
 * @description The component responsible for rendering the header menus.
 * @author Mohammed Odunayo
 * @class LeftLinks
 * @name LeftLinks
 */

import React from "react";
import {NavLink} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {ListItem, Tooltip, Avatar} from "@material-ui/core";
import {AccountCircle, PowerSettingsNew} from '@material-ui/icons';

import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.jsx";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import {userIs} from "../Auth/AccessControl.jsx";

class LeftLinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

    this.events = this.props.events;
  }

  getUserAvatar = (classes, users) => {

    switch(users){

      case 'customer':
        return(<ListItem className={classes.listItem}>
          <Tooltip title="My Account" placement="right" classes={{ tooltip: classes.tooltip }}>
            <span color="transparent" style={{padding: "0px"}}>
              <CustomDropdown
                buttonText={
                  <Avatar alt="User Avatar" src={require('../../assets/img/faces/marc.jpg')} />
                }
                buttonProps={{
                  className: classes.navLink,
                  style: {padding: "7px 12px"},
                  color: "transparent",
                }}
                dropdownList={[
                  <NavLink
                    to="/profile"
                    className={classes.dropdownLink}
                  >
                    <AccountCircle style={{marginBottom: "-8px"}} /> My Profile
                  </NavLink>,
                  <a
                    onClick={() => this.events.emit("usersLogOut", "customer")}
                    className={classes.dropdownLink}
                  >
                    <PowerSettingsNew style={{marginBottom: "-8px"}} /> Logout
                  </a>,
                ]}
              />
            </span>
          </Tooltip>
        </ListItem>);

      case 'vendor':
        return(<ListItem className={classes.listItem}>
          <Tooltip title="My Account" placement="right" classes={{ tooltip: classes.tooltip }}>
            <span color="transparent" style={{padding: "0px"}}>
              <CustomDropdown
                buttonText={
                  <Avatar alt="User Avatar" src={require('../../assets/img/faces/marc.jpg')} />
                }
                buttonProps={{
                  className: classes.navLink,
                  style: {padding: "7px 12px"},
                  color: "transparent",
                }}
                dropdownList={[
                  <NavLink
                    to="/dashboard"
                    className={classes.dropdownLink}
                  >
                    <AccountCircle style={{marginBottom: "-8px"}} /> My Profile
                  </NavLink>,
                  <a
                    onClick={() => this.events.emit("usersLogOut", "customer")}
                    className={classes.dropdownLink}
                  >
                    <PowerSettingsNew style={{marginBottom: "-8px"}} /> Logout
                  </a>,
                ]}
              />
            </span>
          </Tooltip>
        </ListItem>);

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

export default withStyles(headerLinksStyle)(LeftLinks);

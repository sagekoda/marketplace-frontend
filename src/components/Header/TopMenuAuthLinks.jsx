/**
 * @description The component responsible for rendering the header menus.
 * @author Mohammed Odunayo
 * @class TopMenuAuthLinks
 * @name TopMenuAuthLinks
 */

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {ListItem} from "@material-ui/core";

import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.jsx";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import {userIs} from "../Auth/AccessControl.jsx";

class TopMenuAuthLinks extends React.Component {
  constructor(props){
    super(props);
    this.events = this.props.events;
  }
  
  render() {
    const { classes, users } = this.props;

    return (
            <span>
            {(!userIs([users]))?
              <span>
                <ListItem className={classes.listItem}>
                  <CustomDropdown buttonText="Login" dropdownHeader="Login as"
                    buttonProps={{
                      className: classes.navLink,
                      color: "transparent"
                    }}
                    dropdownList={[
                      <a
                        onClick={() => {
                          this.events.emit("usersLogin", "Customer");
                        }}
                        className={classes.dropdownLink}
                      >
                        Customer Login
                      </a>,
                      <a
                        onClick={() => {
                          this.events.emit("usersLogin", "Vendor");
                        }}
                        className={classes.dropdownLink}
                      >
                        Vendor Login
                      </a>,
                    ]}
                  />
                </ListItem>
                <ListItem className={classes.listItem}>
                  <CustomDropdown buttonText="Sign Up" dropdownHeader="Sign Up as"
                    buttonProps={{
                      className: classes.navLink,
                      color: "transparent"
                    }}
                    dropdownList={[
                      <a
                        onClick={() => {
                          this.events.emit("usersSignUp", "Customer");
                        }}
                        className={classes.dropdownLink}
                      >
                        Customer Sign Up
                      </a>,
                      <a
                        onClick={() => {
                          this.events.emit("usersSignUp", "Vendor");
                        }}
                        className={classes.dropdownLink}
                      >
                        Vendor Sign Up
                      </a>,
                    ]}
                  />
                </ListItem>
              </span>
            :
              null
            }
          </span>
    );
  }
}

export default withStyles(headerLinksStyle)(TopMenuAuthLinks);

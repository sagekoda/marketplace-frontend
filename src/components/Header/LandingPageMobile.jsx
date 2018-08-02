/**
 * @description The component responsible for rendering the responsive header menus.
 * @author Mohammed Odunayo
 * @class LandingPageMobile
 * @name LandingPageMobile
 */

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {List} from "@material-ui/core";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import UsersAuth from "../Auth/UsersAuth.jsx";
import SideMenuUserAvatar from "./SideMenuUserAvatar.jsx";
import SideMenuAuthLinks from "./SideMenuAuthLinks.jsx";
import Events from "events";

class LandingPageMobile extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      accountOpen: false,
      loginOpen: false,
      signUpOpen: false,
    };

    this.events = new Events();
  }

  handleAccount = () => {
    this.setState(state => ({ accountOpen: !state.accountOpen }));
  };

  handleLogin = () => {
    this.setState(state => ({ loginOpen: !state.loginOpen }));
  };

  handleSignUp = () => {
    this.setState(state => ({ signUpOpen: !state.signUpOpen }));
  };

  render() {
    const { classes, user } = this.props;

  return (
    <div>
      <UsersAuth events={this.events} />
        <List className={classes.list}>
          <SideMenuUserAvatar events={this.events} users={user} />
          <SideMenuAuthLinks events={this.events} users={user} />
        </List>
    </div>
  );
}
}

export default withStyles(headerLinksStyle)(LandingPageMobile);

/**
 * @description The component responsible for rendering the header menus.
 * @author Mohammed Odunayo
 * @class LandingPageLinks
 * @name LandingPageLinks
 */

import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {List} from "@material-ui/core";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import UsersAuth from "../Auth/UsersAuth.jsx";
import TopMenuAuthLinks from "./TopMenuAuthLinks.jsx";
import TopMenuUserAvatar from "./TopMenuUserAvatar.jsx";
import Events from "events";

class LandingPageLinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {};

    this.events = new Events();
  }
  
  render() {
    const { classes, user } = this.props;

    return (
      <div>
          <UsersAuth events={this.events} />
          <List className={classes.list}>
            <TopMenuAuthLinks events={this.events} users={user} />
            <TopMenuUserAvatar events={this.events} users={user} />
          </List>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(LandingPageLinks);

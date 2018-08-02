/**
 * @description The component header component on the admin dashboard
 * @author Sylvia Onwukwe
**/
import React from "react";
import {Link} from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import {List, ListItem, Avatar} from "@material-ui/core";
import { AccountCircle, PowerSettingsNew} from '@material-ui/icons';

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import UsersAuth from "../Auth/UsersAuth.jsx";
import Events from "events";
import {NavLink} from "react-router-dom";
import { userIs } from "../Auth/AccessControl";
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.jsx";



class AdminHeader extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      accountOpen: false
    };
    this.events = new Events ();
  }
  handleAccount = () => {
    this.setState(state => ({ accountOpen: !state.accountOpen }));
  };

  render() {
    const { classes } = this.props;

  return (
    <div>
        <UsersAuth events={this.events} />
        <List className={classes.list}>
        {(userIs(["admin"]))?
           <ListItem className={classes.listItem}>
               <CustomDropdown
                 buttonText={
                   <Avatar className={classes.bigAvatar} alt="User Avatar" src={require('../../assets/img/faces/marc.jpg')} />
                 }
                 buttonProps={{
                   className: classes.navLink,
                   style: {padding: "7px 12px"},
                   color: "transparent",
                 }}
                 dropdownList={[
                   <NavLink
                     to="/admin/profile"
                     className={classes.dropdownLink}
                   >
                     <AccountCircle style={{marginBottom: "-8px"}} /> My Profile
                   </NavLink>,
                   <a
                     onClick={() => this.events.emit("usersLogOut", "admin")}
                     className={classes.dropdownLink}
                   >
                     <PowerSettingsNew style={{marginBottom: "-8px"}} /> Logout
                   </a>,
                 ]}
               />
         </ListItem>
         :
         null
        }
        </List>
        
    </div>
  );
}
}

export default withStyles(headerLinksStyle)(AdminHeader);

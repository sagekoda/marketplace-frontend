/**
 * @description The profile card view.
 * @author Mohammed Odunayo
 * @class ProfileCard
 * @name ProfileCard
 */

import React from "react";
// core components
import { 
  Paper,
  Typography,
  BottomNavigation,
  BottomNavigationAction,
  List,
  ListItemIcon,
  ListItemText,
  ListItem
 } from "@material-ui/core";

import { 
  Notifications,
  Comment,
  Favorite,
  Dashboard,
  AccountCircle,
  ShoppingBasket,
  Receipt
} from "@material-ui/icons";
import { primaryColor, successColor, dangerColor, warningColor } from "../../../assets/jss/material-kit-react";


class ProfileCard extends React.Component {
    constructor(props){
        super(props);
        this.state = this.props.state;
    }

    componentWillReceiveProps(newProps){
        this.setState(...this.state, newProps.state);
    }

    render() {
        const {classes} = this.props;

        return(
            <Paper className={classes.paper} elevation={4}>
                <div className={classes.profileHead}>
                    <img className={classes.profileImage} src={require('../../../assets/img/faces/marc.jpg')} height="100px" alt="Profile" />
                    <Typography style={{color: "white"}} align={"center"} variant={"title"} >
                        Customer Name
                    </Typography>
                    <Typography gutterBottom style={{color: "white"}} align={"center"} variant={"body1"} >
                        username@domain.com
                    </Typography>
                </div>
                <List component="nav" dense={false} style={{padding: "0px"}} >
                    <ListItem
                        onClick={() => this.props.goto("overview")}
                        button
                        style={(this.state.overview)? {borderLeft: "4px solid #29b6f6", backgroundColor: "#ceeefd"} : null}
                    >
                        <ListItemIcon>
                            <Dashboard style={(this.state.overview)? {color: "#29b6f6"} : null} />
                        </ListItemIcon>
                        <ListItemText primary="Overview" />
                    </ListItem>
                    <ListItem
                        onClick={() => this.props.goto("profile")}
                        button
                        style={(this.state.profile)? {borderLeft: "4px solid #29b6f6", backgroundColor: "#ceeefd"} : null}
                    >
                        <ListItemIcon>
                            <AccountCircle style={(this.state.profile)? {color: "#29b6f6"} : null} />
                        </ListItemIcon>
                        <ListItemText primary="Profile" />
                    </ListItem>
                    <ListItem
                        onClick={() => this.props.goto("blogs")}
                        button
                        style={(this.state.blogs)? {borderLeft: "4px solid #29b6f6", backgroundColor: "#ceeefd"} : null}
                    >
                        <ListItemIcon>
                            <Notifications style={(this.state.notifications)? {color: "#29b6f6"} : null} />
                        </ListItemIcon>
                        <ListItemText primary="Notifications" />
                    </ListItem>
                    <ListItem
                        onClick={() => this.props.goto("orders")}
                        button
                        style={(this.state.orders)? {borderLeft: "4px solid #29b6f6", backgroundColor: "#ceeefd"} : null}
                    >
                        <ListItemIcon>
                            <ShoppingBasket style={(this.state.orders)? {color: "#29b6f6"} : null} />
                        </ListItemIcon>
                        <ListItemText primary="Orders" />
                    </ListItem>
                    <ListItem
                        onClick={() => this.props.goto("wishlist")}
                        button
                        style={(this.state.wishlist)? {borderLeft: "4px solid #29b6f6", backgroundColor: "#ceeefd"} : null}
                    >
                        <ListItemIcon>
                            <Favorite style={(this.state.wishlist)? {color: "#29b6f6"} : null} />
                        </ListItemIcon>
                        <ListItemText primary="Wishlist" />
                    </ListItem>
                    <ListItem
                        onClick={() => this.props.goto("ticket")}
                        button
                        style={(this.state.ticket)? {borderLeft: "4px solid #29b6f6", backgroundColor: "#c4ebfd"} : null}
                    >
                        <ListItemIcon>
                            <Receipt style={(this.state.ticket)? {color: "#29b6f6"} : null} />
                        </ListItemIcon>
                        <ListItemText primary="Ticket" />
                    </ListItem>
                </List>
                <BottomNavigation value={""} showLabels style={{overflowX: "scroll", margin: "0px 0%", cursor: "pointer"}} >
                    <BottomNavigationAction
                    icon={<span>
                        <Notifications />
                        </span>}
                    style={{borderTop: "4px solid "+primaryColor, color: primaryColor}}
                    />
                    <BottomNavigationAction
                    icon={<span>
                        <Comment />
                        </span>}
                    style={{borderTop: "4px solid "+successColor, color: successColor}}
                    />
                    <BottomNavigationAction
                    icon={<span>
                        <Favorite />
                        </span>}
                    style={{borderTop: "4px solid "+dangerColor, color: dangerColor}}
                    />
                    <BottomNavigationAction
                    icon={<span>
                        <Receipt />
                        </span>}
                    style={{borderTop: "4px solid "+warningColor, color: warningColor}}
                    />
                </BottomNavigation>
            </Paper>
        );
    }
}

export default (ProfileCard);
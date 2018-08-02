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
import {List, ListItem, Tooltip} from "@material-ui/core";
import {ShoppingCart, Compare} from '@material-ui/icons';

import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.jsx";
import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import Badge from '../../components/Badge/Badge.jsx';
import TopMenuAuthLinks from './TopMenuAuthLinks.jsx';
import TopMenuUserAvatar from "./TopMenuUserAvatar.jsx";
import UsersAuth from "../Auth/UsersAuth.jsx";
import Events from "events";

class LeftLinks extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      Cart: (localStorage.cart)? Object.keys(JSON.parse(localStorage.cart)).length : 0,
      Compare: (localStorage.compare)? JSON.parse(localStorage.compare).length : 0
    };

    this.events = new Events();

    if(this.props.events){
      this.props.events.on('add-to-cart', this.updateCart.bind(this));
      this.props.events.on('add-to-compare', this.updateCompare.bind(this));
    }
  }

  updateCart() {
    let cart = (localStorage.cart)? Object.keys(JSON.parse(localStorage.cart)).length : 0;
    this.setState(...this.state, {Cart: cart});
  }

  updateCompare() {
    let compare = (localStorage.compare)? JSON.parse(localStorage.compare).length : 0;
    this.setState(...this.state, {Compare: compare});
  }
  
  render() {
    const { classes, user } = this.props;

    return (
      <div>
          <UsersAuth events={this.events} />
          <List className={classes.list}>
            <ListItem className={classes.listItem}>
              <CustomDropdown buttonText="Products" dropdownHeader="Products"
                buttonProps={{
                  className: classes.navLink,
                  color: "transparent"
                }}
                dropdownList={[
                  <NavLink to="/" className={classes.dropdownLink}>All Products</NavLink>,
                  <NavLink to="/products/today" className={classes.dropdownLink}>Today's Deal</NavLink>,
                  <NavLink to="/products/featured" className={classes.dropdownLink}>Featured Products</NavLink>,
                  <NavLink to="/products/latest" className={classes.dropdownLink}>Latest Products</NavLink>,
                  <NavLink to="/products/popular" className={classes.dropdownLink}>Popular Products</NavLink>,
                ]}
              />
            </ListItem>
            <ListItem className={classes.listItem}>
              <NavLink to="/categories" className={classes.navLink} color="transparent">
                Categories
              </NavLink>
            </ListItem>
            <ListItem className={classes.listItem}>
              <NavLink to="/vendors" className={classes.navLink} color="transparent">
                Vendors
              </NavLink>
            </ListItem>
            <ListItem className={classes.listItem}>
              <NavLink to="/brands" className={classes.navLink} color="transparent">
                Brands
              </NavLink>
            </ListItem>
            <ListItem className={classes.listItem}>
              <NavLink to="/blogs" className={classes.navLink} color="transparent">
                Blogs
              </NavLink>
            </ListItem>

            <TopMenuAuthLinks events={this.events} users={user} />

            <ListItem className={classes.listItem}>
            {(this.state.Compare > 1)?
              <Tooltip title="Compare Products" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                <NavLink to="/compare" className={classes.navLink} color="transparent">
                  <Compare /><Badge color="primary" className={classes.navLink}>
                    <big style={{fontSize: "1.3em"}}>
                      {this.state.Compare}
                    </big>
                  </Badge>
                </NavLink>
              </Tooltip>
              :
              <Tooltip title="Needed 2 Product to Compare" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                <span className={classes.navLink} color="transparent">
                  <Compare />
                  {(this.state.Compare > 0)? <Badge color="primary" className={classes.navLink}>
                    <big style={{fontSize: "1.3em"}}>
                      {this.state.Compare}
                    </big>
                  </Badge>
                  :
                  null
                  }
                </span>
              </Tooltip>
            }
            </ListItem>
            <ListItem className={classes.listItem}>
              {(this.state.Cart > 0)?
              <Tooltip title="View Shopping Cart" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                <NavLink to="/cart" className={classes.navLink} color="transparent">
                  <ShoppingCart />
                  <Badge color="primary" className={classes.navLink}>
                    <big style={{fontSize: "1.3em"}}>
                      {this.state.Cart}
                    </big>
                  </Badge>
                </NavLink>
              </Tooltip>
              :
              <Tooltip title="Empty Shopping Cart" placement="bottom" classes={{ tooltip: classes.tooltip }}>
                <span className={classes.navLink} color="transparent">
                  <ShoppingCart />
                </span>
              </Tooltip>
              }
            </ListItem>

            <TopMenuUserAvatar events={this.events} users={user} />

          </List>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(LeftLinks);

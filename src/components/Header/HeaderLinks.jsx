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
import {List, ListItem, Collapse} from "@material-ui/core";
import {ExpandLess, ExpandMore, Compare, ShoppingCart} from '@material-ui/icons';

import headerLinksStyle from "../../assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import Badge from '../../components/Badge/Badge.jsx';
import SideMenuAuthLinks from "./SideMenuAuthLinks.jsx";
import SideMenuUserAvatar from "./SideMenuUserAvatar.jsx";
import UsersAuth from "../Auth/UsersAuth.jsx";
import Events from "events";

class HeaderLinks extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      productOpen: false,
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

  handleProduct = () => {
    this.setState(state => ({ productOpen: !state.productOpen }));
  };

  handleAccount = () => {
    this.setState(state => ({ accountOpen: !state.accountOpen }));
  };

  render() {
    const { classes, user } = this.props;

  return (
    <div>
        <UsersAuth events={this.events} />
        <List className={classes.list}>

          <SideMenuUserAvatar events={this.events} users={user} />

          <ListItem className={classes.listItem}>
          {(this.state.Cart > 0)?
            <Link to="/cart" className={classes.navLink} color="transparent">
              <ShoppingCart />&nbsp;Shopping Cart&nbsp;<Badge color="primary" className={classes.navLink}>
                <big style={{fontSize: "1.3em"}}>
                  {this.state.Cart}
                </big>
              </Badge>
            </Link>
            :
            <span className={classes.navLink} color="transparent">
              <ShoppingCart />&nbsp;Shopping Cart
            </span>
          }
          </ListItem>
          <ListItem className={classes.listItem}>
          {(this.state.Compare > 1)?
            <Link to="/compare" className={classes.navLink} color="transparent">
              <Compare />&nbsp;Compare&nbsp;
              <Badge color="primary" className={classes.navLink}>
                <big style={{fontSize: "1.3em"}}>
                  {this.state.Compare}
                </big>
              </Badge>
            </Link>
            :
            <span className={classes.navLink} color="transparent">
              <Compare />&nbsp;Compare&nbsp;
              {(this.state.Compare > 0)? <Badge color="primary" className={classes.navLink}>
                <big style={{fontSize: "1.3em"}}>
                  {this.state.Compare}
                </big>
              </Badge>
              :
              null
              }
            </span>
          }
          </ListItem>

          <SideMenuAuthLinks events={this.events} users={user} />

          <ListItem className={classes.listItem} onClick={this.handleProduct}>
            <Link to="#products" className={classes.navLink} color="transparent">
              Products {this.state.productOpen ? <ExpandLess /> : <ExpandMore />}
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Collapse in={this.state.productOpen} timeout="auto" unmountOnExit color="transparent">
              <List component="div" style={{marginLeft: "30px"}}>
                <ListItem button className={classes.nested}>
                  <Link to="/" className={classes.dropdownLink}>All Products</Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <Link to="/products/today" className={classes.dropdownLink}>Today's Deal</Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <Link to="/products/featured" className={classes.dropdownLink}>Featured Products</Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <Link to="/products/latest" className={classes.dropdownLink}>Latest Products</Link>
                </ListItem>
                <ListItem button className={classes.nested}>
                  <Link to="/products/popular" className={classes.dropdownLink}>Popular Products</Link>
                </ListItem>
              </List>
            </Collapse>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/categories" className={classes.navLink} color="transparent">
              Categories
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/vendors" className={classes.navLink} color="transparent">
              Vendors
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/brands" className={classes.navLink} color="transparent">
              Brands
            </Link>
          </ListItem>
          <ListItem className={classes.listItem}>
            <Link to="/blogs" className={classes.navLink} color="transparent">
              Blogs
            </Link>
          </ListItem>
        </List>
    </div>
  );
}
}

export default withStyles(headerLinksStyle)(HeaderLinks);

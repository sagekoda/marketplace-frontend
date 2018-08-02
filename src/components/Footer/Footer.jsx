/**
 * @description This is the parent footer component that render the megaFooter and the bottomFooter.
 * @author Mohammed Odunayo
 * @class Footer
 * @name Footer
 */

import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import {Link} from "react-router-dom";

import { List, ListItem, withStyles, Button } from "@material-ui/core";

import footerStyle from "../../assets/jss/material-kit-react/components/footerStyle.jsx";
import MegaFooter from "./MegaFooter.jsx";

class Footer extends React.Component {

  render() {
    const { classes, whiteFont, topFooter } = this.props;

    const footerClasses = classNames({
      [classes.footer]: true,
      [classes.footerWhiteFont]: whiteFont
    });
    const aClasses = classNames({
      [classes.a]: true,
      [classes.footerWhiteFont]: whiteFont
    });

    const megaFooter = (topFooter) ? <MegaFooter /> : "" ;
    return (
      <div>
      {megaFooter}
      <footer className={footerClasses}>
        <div className={classes.container}>
          <div className={classes.left}>
            <List className={classes.list}>
              <ListItem className={classes.inlineBlock}>
                <Link
                  to="/"
                >
                  <Button simple="true">Home</Button>
                </Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link
                  to="/about"
                >
                  <Button simple="true">About us</Button>
                </Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link
                  to="/contact"
                >
                  <Button simple="true">Contact Us</Button>
                </Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link
                  to="/policy"
                >
                  <Button simple="true">Privacy Policy</Button>
                </Link>
              </ListItem>
              <ListItem className={classes.inlineBlock}>
                <Link
                  to="/terms"
                >
                  <Button simple="true">Terms & Conditions</Button>
                </Link>
              </ListItem>
            </List>
          </div>
          <div className={classes.right}>
            &copy; {1900 + new Date().getYear()}
            <Link
              to="/"
              className={aClasses}
            >
              <Button simple="true">Bezop Store</Button>
            </Link>
          </div>
        </div>
      </footer>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool,
  topFooter: PropTypes.bool
};

export default withStyles(footerStyle)(Footer);

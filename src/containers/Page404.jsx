/**
 * @description The Login container.
 * @author Mohammed Odunayo
 * @class Login
 * @name Login
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage.jsx";
import Page404Component from '../views/Page404/Page404.jsx';

const mapStateToProps = state => ({
  info: state.info,
});

const Page404 = connect(
  mapStateToProps,
)(Page404Component);

export default withStyles(loginPageStyle)(Page404);

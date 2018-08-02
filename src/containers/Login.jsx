/**
 * @description The Login container.
 * @author Mohammed Odunayo
 * @class Login
 * @name Login
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage.jsx";
import LoginComponent from '../views/LoginPage/Login.jsx';

const mapStateToProps = state => ({
  info: state.front
});

const Login = connect(
  mapStateToProps,
)(LoginComponent);

export default withStyles(loginPageStyle)(Login);

/**
 * @description The Vendor Account Setup container.
 * @author Mohammed Odunayo
 * @class AccountSetup
 * @name AccountSetup
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import loginPageStyle from "../assets/jss/material-kit-react/views/loginPage.jsx";
import AccountSetupComponent from '../views/AccountSetup/AccountSetup.jsx';

const mapStateToProps = state => ({
  info: state.front
});

const AccountSetup = connect(
  mapStateToProps,
)(AccountSetupComponent);

export default withStyles(loginPageStyle)(AccountSetup);

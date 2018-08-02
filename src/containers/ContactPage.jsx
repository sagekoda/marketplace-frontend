/**
 * @description The Contact Page container.
 * @author Mohammed Odunayo
 * @class ContactPage
 * @name ContactPage
 */

import { connect } from 'react-redux';
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ContactPageComponent from '../views/ContactPage/ContactPage';

const mapStateToProps = state => ({
  info: state.front,
});

const ContactPage = connect(
  mapStateToProps,
)(ContactPageComponent);

export default withStyles(componentsStyle)(ContactPage);

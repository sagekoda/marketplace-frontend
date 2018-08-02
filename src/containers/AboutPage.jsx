/**
 * @description The About Page container.
 * @author Mohammed Odunayo
 * @class AboutPage
 * @name AboutPage
 */

import { connect } from 'react-redux';
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import AboutPageComponent from '../views/AboutPage/AboutPage';

const mapStateToProps = state => ({
  info: state.front,
});

const AboutPage = connect(
  mapStateToProps,
)(AboutPageComponent);

export default withStyles(componentsStyle)(AboutPage);

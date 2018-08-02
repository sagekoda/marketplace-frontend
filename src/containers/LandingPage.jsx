import { connect } from 'react-redux';
import landingPageStyle from "../assets/jss/material-kit-react/views/landingPage.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import LandingPageComponent from '../views/LandingPage/LandingPage';

const mapStateToProps = state => ({
  info: state.info,
});

const LandingPage = connect(
  mapStateToProps,
)(LandingPageComponent);

export default withStyles(landingPageStyle)(LandingPage);

/**
 * @description The Home container.
 * @author Mohammed Odunayo
 * @class Home
 * @name Home
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import HomeComponent from '../views/HomePage/Home.jsx';
// import Auth, {LS_KEY} from "../../components/Auth/UsersAuth.jsx";

const mapStateToProps = state => ({
  front: state.front
});

const Home = connect(
  mapStateToProps,
)(HomeComponent);

export default withStyles(componentsStyle)(Home);

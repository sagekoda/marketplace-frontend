/**
 * @description Customer Profile Container.
 * @author Mohammed Odunayo
 * @name ProfilePage
 */

import { connect } from 'react-redux';
import {styles} from "../assets/jss/CustomerProfileStyles.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import ProfilePageComponent from '../views/ProfilePage/ProfilePage';

const mapStateToProps = state => ({
  front: state.front,
});

const ProfilePage = connect(
  mapStateToProps,
)(ProfilePageComponent);

export default withStyles(styles)(ProfilePage);

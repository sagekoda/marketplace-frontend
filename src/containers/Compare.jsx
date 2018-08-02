/**
 * @description The Combine container.
 * @author Mohammed Odunayo
 * @class Compare
 * @name Compare
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import CompareComponent from '../views/ComparePage/Compare.jsx';

const mapStateToProps = state => ({
  front: state.front
});

const Compare = connect(
  mapStateToProps,
)(CompareComponent);

export default withStyles(componentsStyle)(Compare);

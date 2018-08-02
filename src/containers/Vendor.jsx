/**
 * @description The Vendor container.
 * @author Mohammed Odunayo
 * @class Vendor
 * @name Vendor
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import VendorComponent from '../views/VendorPage/Vendor.jsx';

const mapStateToProps = state => ({
  front: state.front
});

const Vendor = connect(
  mapStateToProps,
)(VendorComponent);

export default withStyles(componentsStyle)(Vendor);

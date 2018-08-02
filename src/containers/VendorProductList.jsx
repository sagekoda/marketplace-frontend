/**
 * @description The Products container.
 * @author Mohammed Odunayo
 * @class VendorProductList
 * @name VendorProductList
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import VendorProductListComponent from '../views/VendorPage/Vendors.jsx';



const mapStateToProps = state => ({
  front: state.front
});

const VendorProductList = connect(
  mapStateToProps,
)(VendorProductListComponent);

export default withStyles(componentsStyle)(VendorProductList);

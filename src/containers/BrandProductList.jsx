/**
 * @description The Products container.
 * @author Mohammed Odunayo
 * @class BrandProductList
 * @name BrandProductList
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import BrandProductListComponent from '../views/BrandPage/Brands.jsx';



const mapStateToProps = state => ({
  front: state.front
});

const BrandProductList = connect(
  mapStateToProps,
)(BrandProductListComponent);

export default withStyles(componentsStyle)(BrandProductList);

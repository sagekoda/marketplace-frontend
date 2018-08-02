/**
 * @description The Single Product container.
 * @author Mohammed Odunayo
 * @class SingleProduct
 * @name SingleProduct
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import SingleProductComponent from '../views/ProductPages/SingleProduct.jsx';

const mapStateToProps = state => ({
  front: state.front
});

const SingleProduct = connect(
  mapStateToProps,
)(SingleProductComponent);

export default withStyles(componentsStyle)(SingleProduct);

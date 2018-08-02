/**
 * @description The Products container.
 * @author Mohammed Odunayo
 * @class ProductList
 * @name ProductList
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import ProductListComponent from '../views/ProductPages/Products.jsx';



const mapStateToProps = state => ({
  front: state.front
});



const ProductList = connect(
  mapStateToProps,
)(ProductListComponent);

export default withStyles(componentsStyle)(ProductList);

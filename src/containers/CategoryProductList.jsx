/**
 * @description The Products container.
 * @author Mohammed Odunayo
 * @class CategoryProductList
 * @name CategoryProductList
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import CategoryProductListComponent from '../views/CategoryPage/Categories.jsx';



const mapStateToProps = state => ({
  front: state.front
});

const CategoryProductList = connect(
  mapStateToProps,
)(CategoryProductListComponent);

export default withStyles(componentsStyle)(CategoryProductList);

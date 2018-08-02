/**
 * @description The Category container.
 * @author Mohammed Odunayo
 * @class Category
 * @name Category
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import CategoryComponent from '../views/CategoryPage/Category.jsx';

const mapStateToProps = state => ({
  front: state.front
});

const Category = connect(
  mapStateToProps,
)(CategoryComponent);

export default withStyles(componentsStyle)(Category);

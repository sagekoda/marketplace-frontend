/**
 * @description The Blog Page container.
 * @author Mohammed Odunayo
 * @class BlogPage
 * @name BlogPage
 */

import { connect } from 'react-redux';
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import BlogPageComponent from '../views/BlogPages/BlogPage';

const mapStateToProps = state => ({
  info: state.front,
});

const BlogPage = connect(
  mapStateToProps,
)(BlogPageComponent);

export default withStyles(componentsStyle)(BlogPage);

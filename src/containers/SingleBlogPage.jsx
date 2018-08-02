/**
 * @description The Single Blog Page container.
 * @author Mohammed Odunayo
 * @class SingleBlogPage
 * @name SingleBlogPage
 */

import { connect } from 'react-redux';
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import withStyles from "@material-ui/core/styles/withStyles";
import SingleBlogPageComponent from '../views/BlogPages/SingleBlogPage';

const mapStateToProps = state => ({
  info: state.front,
});

const SingleBlogPage = connect(
  mapStateToProps,
)(SingleBlogPageComponent);

export default withStyles(componentsStyle)(SingleBlogPage);

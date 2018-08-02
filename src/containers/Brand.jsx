/**
 * @description The Brand container.
 * @author Mohammed Odunayo
 * @class Brand
 * @name Brand
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import BrandComponent from '../views/BrandPage/Brand.jsx';

const mapStateToProps = state => ({
  front: state.front
});

const Brand = connect(
  mapStateToProps,
)(BrandComponent);

export default withStyles(componentsStyle)(Brand);

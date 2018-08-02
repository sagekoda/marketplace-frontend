/**
 * @description The Cart container.
 * @author Mohammed Odunayo
 * @class Cart
 * @name Cart
 */

import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import componentsStyle from "../assets/jss/material-kit-react/views/components.jsx";
import CartComponent from '../views/CartPage/Cart.jsx';

const mapStateToProps = state => ({
  front: state.front
});

const Cart = connect(
  mapStateToProps,
)(CartComponent);

export default withStyles(componentsStyle)(Cart);

/**
 * @description The frontend reducer.
 * @author Mohammed Odunayo
 * @name reducer_front
 */

import { SLIDERS, CATEGORIES, VENDORS, BRANDS, PRODUCTS } from '../actions/actions_front';

const front = (state = {
  sliders: [],
  categories: [],
  vendors: [],
  brands: [],
  products: []
}, action) => {
  switch (action.type) {
    case SLIDERS:
      return Object.assign({}, state, action.payload);
    case CATEGORIES:
      return Object.assign({}, state, action.payload);
    case VENDORS:
      return Object.assign({}, state, action.payload);
    case BRANDS:
      return Object.assign({}, state, action.payload);
    case PRODUCTS:
      return Object.assign({}, state, {products: action.payload});
    default:
      return state;
  }
};

export default front;

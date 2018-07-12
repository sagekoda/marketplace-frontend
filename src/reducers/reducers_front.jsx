/**
 * @description The frontend reducer.
 * @author Mohammed Odunayo
 * @name reducer_front
 */

import { SLIDERS, CATEGORIES, VENDORS, BRANDS } from '../actions/actions_front';

const front = (state = {
  sliders: [],
  categories: [],
  vendors: [],
  brands: []
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
    default:
      return state;
  }
};

export default front;

//@desc reducers index
//@co author Sylvia Onwukwe
import { combineReducers } from 'redux';

import front from './reducers_front';
import productCategory from './reducers_product_category';
import productBrand from './reducers_product_brand';
import vendorCoupon from "./reducers_vendor_coupon"
import vendorProfile from './reducers_vendor';
import vendorBlog from './reducers_vendor_blog';

import adminBlog from './reducers_admin_blog';
import adminCoupon from "./reducers_admin_coupon";
import adminCurrency from "./reducers_admin_currency";
import adminCustomers from "./reducers_admin_customers";
import adminLanguage from './reducers_admin_language';
import languageList from './reducers_admin_languageList';
import adminOrder from './reducers_admin_order';
import adminBrand from './reducers_admin_productBrands';
import adminCategory from './reducers_admin_productCategory';
import adminProduct from './reducers_admin_products';
import adminProfile from './reducers_admin_adminProfile';
import adminVendors from './reducers_admin_vendor';
import subscriber from "./reducers_admin_subscribers";

import product from './reducers_product';

const rootReducer = combineReducers({
  front,
  productCategory,
  productBrand,
  vendorCoupon,
  vendorBlog,

  adminBlog,
  adminCoupon,
  adminCurrency,
  adminCustomers,
  adminLanguage,
  languageList,
  adminOrder,
  adminBrand,
  adminCategory,
  adminProduct,
  adminProfile,
  adminVendors,
  subscriber,
  vendorProfile,
  product
});

export default rootReducer;

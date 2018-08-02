/**
 * @description The main router of the application.
 * @author Mohammed Odunayo
 * @co-author Sylvia Onwukwe
 * @co-author Ifeoluwa Odewale
 * @name index
 */

import React from "react";
import { Redirect } from 'react-router'
import { userIs, isVerified } from "../components/Auth/AccessControl";

//Vendor Containers
import Dashboard from "../layouts/Dashboard/Dashboard";
import Messages from "../layouts/Dashboard/Dashboard";
import Products from "../layouts/Dashboard/Dashboard";
import Orders from "../layouts/Dashboard/Dashboard";
import Coupons from "../layouts/Dashboard/Dashboard";
import Banner from "../layouts/Dashboard/Dashboard";
import Shop from "../layouts/Dashboard/Dashboard";
import Support from "../layouts/Dashboard/Dashboard";
import UserProfile from "../layouts/Dashboard/Dashboard";
import AccountSetup from "../containers/AccountSetup"
import Blog from "../layouts/Dashboard/Dashboard.jsx";

//Admin Containers
import Admin from "../Admin/LandingPage/layout";
import AdminProductCategory from "../Admin/LandingPage/layout";
import DiscountCoupon from "../Admin/LandingPage/layout";
import AdminCustomers from "../Admin/LandingPage/layout";
import AdminMessages from "../Admin/LandingPage/layout";
import EmailTemplate from "../Admin/LandingPage/layout";
import AdminProduct from "../Admin/LandingPage/layout";
import AdminVendors from "../Admin/LandingPage/layout";
import AdminProfile from "../Admin/LandingPage/layout";
import AdminBrands from "../Admin/LandingPage/layout";
import AdminOrder from "../Admin/LandingPage/layout";
import AdminStore from "../Admin/LandingPage/layout";
import AdminBlog from "../Admin/LandingPage/layout";
import Currency from "../Admin/LandingPage/layout";
import Language from "../Admin/LandingPage/layout";
import AdminSeo from "../Admin/LandingPage/layout";

//Customer Containers
import Home from "../containers/Home";
import Cart from "../containers/Cart";
import Compare from "../containers/Compare";
import Login from "../containers/Login";
import Page404 from "../containers/Page404";
import Category from "../containers/Category";
import CategoryProductList from "../containers/CategoryProductList";
import Brand from "../containers/Brand";
import Vendor from "../containers/Vendor";
import VendorProductList from "../containers/VendorProductList";
import About from "../containers/AboutPage";
import Blogs from "../containers/BlogPage";
import BrandProductList from "../containers/BrandProductList";
import SingleBlog from "../containers/SingleBlogPage";
import Contact from "../containers/ContactPage";
import SingleProduct from "../containers/SingleProduct";
import ProductList from "../containers/ProductList";
import Profile from "../containers/ProfilePage";
import LandingPage from "../containers/LandingPage";

var indexRoutes = [
  /**
   * @description Admin Route Directories.
   */
  {
    path: "/admin/templates",
    name: "EmailTemplate",
    Component: (props) => userIs(["admin"])?
      <EmailTemplate {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/language",
    name: "Language",
    Component: (props) => userIs(["admin"])?
      <Language {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/currency",
    name: "Currency",
    Component: (props) => userIs(["admin"])?
      <Currency {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/categories",
    name: "AdminProductCategory",
    Component: (props) => userIs(["admin"])?
      <AdminProductCategory {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/customers",
    name: "Customers",
    Component: (props) => userIs(["admin"])?
      <AdminCustomers {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/messages",
    name:"AdminMessages",
    Component: (props) => userIs(["admin"])?
      <AdminMessages {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/settings",
    name: "AdminStore",
    Component: (props) => userIs(["admin"])?
      <AdminStore {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/products",
    name: "AdminProducts", 
    Component: (props) => userIs(["admin"])?
      <AdminProduct {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/vendors",
    name: "AdminVendors",
    Component: (props) => userIs(["admin"])?
      <AdminVendors {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/profile",
    name: "AdminProfile",
    Component: (props) => userIs(["admin"])?
      <AdminProfile {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/coupons", 
    name: "DiscountCoupons", 
    Component: (props) => userIs(["admin"])?
      <DiscountCoupon {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/orders",
    name: "AdminOrder",
    Component: (props) => userIs(["admin"])?
      <AdminOrder {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/brands",
    name: "AdminBrands",
    Component: (props) => userIs(["admin"])?
      <AdminBrands {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/blog",
    name: "AdminBlog",
    Component: (props) => userIs(["admin"])?
      <AdminBlog {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin/seo",
    name: "AdminSeo",
    Component: (props) => userIs(["admin"])?
      <AdminSeo {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },
  { 
    path: "/admin", 
    name: "Dashboard", 
    Component: (props) => userIs(["admin"])?
      <Admin {...props} />
      :
      <Redirect to={{ pathname: "/login/admin", state: { from: props.location } }} />
  },

  /**
   * @description Vendor Route Directories
   */

  { 
    path: "/dashboard/messages",
    name: "Messages",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <Messages {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard/products/category",
    name: "Product Category",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <Products {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard/products/brand",
    name: "Product Brand",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <Products {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard/products",
    name: "Products",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <Products {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard/settings",
    name: "Settings",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <Shop {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard/coupons",
    name: "Coupons",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <Coupons {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard/support",
    name: "Support",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <Support {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard/blog",
    name: "Blog",
    Component: (props) => userIs(["vendor"])?
      <Blog {...props} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard/banner",
    name: "banners",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <Banner {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard/orders",
    name: "Orders",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <Orders {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard/user",
    name: "Users",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <UserProfile {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/dashboard",
    name:"Dashboard",
    Component: (props) => userIs(["vendor"])?
      (isVerified("vendor"))?
        <Dashboard {...props} />
        :
        <Redirect to={{ pathname: "/account-setup", state: { from: props.location } }} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },
  { 
    path: "/account-setup",
    name:"AccountSetup",
    Component: (props) => userIs(["vendor"])?
      <AccountSetup {...props} />
      :
      <Redirect to={{ pathname: "/login/vendor", state: { from: props.location } }} />
  },

  /**
   * @description Customers Route Directories.
   */

  { 
    path: "/categories",
    name: "Categories",
    Component: (props) => <Category {...props} />
  },
  { 
    path: "/category/:category",
    name: "CategoryProducts",
    Component: (props) => <CategoryProductList {...props} />
  },
  { 
    path: "/products/:products",
    name: "ProductList",
    Component: (props) => <ProductList {...props} />
  },
  { 
    path: "/products",
    name: "ProductList",
    Component: (props) => <ProductList {...props} />
  },
  { 
    path: "/product/:product",
    name: "Product",
    Component: (props) => <SingleProduct {...props} />
  },
  { 
    path: "/vendors",
    name: "Vendors",
    Component: (props) => <Vendor {...props} />
  },
  { 
    path: "/vendor/:vendor",
    name: "Vendor",
    Component: (props) => <VendorProductList {...props} />
  },
  {
    path: "/brands",
    name: "Brands",
    Component: (props) => <Brand {...props} />
  },
  { 
    path: "/brand/:brand",
    name: "Brand",
    Component: (props) => <BrandProductList {...props} />
  },
  { 
    path: "/blog/:blog",
    name: "Blog",
    Component: (props) => <SingleBlog {...props} />
  },
  { 
    path: "/contact",
    name: "Contact",
    Component: (props) => <Contact {...props} />
  },
  { 
    path: "/profile",
    name: "CustomerProfile",
    Component: (props) => userIs(["customer"])?
      <Profile {...props} />
      :
      <Redirect to={{ pathname: "/login/customer", state: { from: props.location } }} />
  },
  { 
    path: "/cart",
    name: "Cart",
    Component: (props) => <Cart {...props} />
  },
  {
    path: "/compare",
    name: "Compare",
    Component: (props) => <Compare {...props} />
  },
  { 
    path: "/blogs",
    name: "Blog",
    Component: (props) => <Blogs {...props} />
  },
  { 
    path: "/login/customer",
    exact: true,
    name: "CustomerLoginPage",
    Component: (props) => <Login {...props} />
  },
  { 
    path: "/login/vendor",
    exact: true,
    name: "VendorLoginPage",
    Component: (props) => <Login {...props} />
  },
  { 
    path: "/login/admin",
    exact: true,
    name: "AdminLoginPage",
    Component: (props) => <Login {...props} />
  },
  { 
    path: "/about",
    name: "About",
    Component: (props) => <About {...props} />
  },
  { 
    path: "/:vendor",
    exact: true,
    name: "FrontStore",
    Component: (props) => <Home {...props} />
  },
  { 
    path: "/",
    exact: true,
    name: "Landing Page",
    Component: (props) => <LandingPage {...props} />
  },
  { 
    path: "*",
    name: "Page404",
    Component: (props) => <Page404 {...props} />
  },
];

export default indexRoutes;

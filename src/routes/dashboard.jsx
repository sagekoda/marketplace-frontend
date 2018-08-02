/**
 * @desc These are the sidebar items/routes
*@author Ifeoluwa Odewale
*@co author Sylvia Onwukwe
 */
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Store from "@material-ui/icons/Store";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import Loyalty from "@material-ui/icons/Loyalty";
import LocationOn from "@material-ui/icons/LocationOn";
import Notifications from "@material-ui/icons/Notifications";
import Email from "@material-ui/icons/Email"
//import Language from "@material-ui/icons/Language"

// core components/views
import DashboardPage from "../containers/Dashboard.jsx";
import UserProfile from "../containers/UserProfiles.jsx";
import Orders from "../containers/Orders.jsx";
import Products from "../containers/Product/Products.jsx";
import ProductCategory from "../containers/Product/Category.jsx";
import ProductBrand from "../containers/Product/Brand.jsx";
import Coupons from "../containers/Coupons.jsx"
import Shop from "../containers/Shops.jsx"
import Support from "../containers/Supports.jsx"
import Banners from "../containers/Banners.jsx";
import Messages from "../containers/Messages.jsx";
import Blog from "../containers/Blog/blog"

export const dashboardRoutes = [
  {
    path: "/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Material Dashboard",
    icon: Dashboard,
    exact: true,
    component: DashboardPage
  },
  {
    path: "/dashboard/messages",
    sidebarName: "Messages",
    navbarName: "Messages",
    icon: Email,
    component: Messages
  },
  
  {
    path: "/dashboard/products",
    sidebarName: "Products",
    navbarName: "Products",
    icon: Store,
    component: Products,
    dropdown : "product",
    subMenu: [
      {
        path: "/dashboard/products",
        sidebarName: "Products",
        navbarName: "Products",
        icon: Store,
        component: Products,
        exact: true
      },
      {
        path: "/dashboard/products/category",
        sidebarName: "Product Category",
        navbarName: "Product Category",
        icon: Store,
        component: ProductCategory,
      },
      {
        path: "/dashboard/products/brand",
        sidebarName: "Product Brand",
        navbarName: "Product Brand",
        icon: Store,
        component: ProductBrand,
      }
    ]
  },
  {
    path: "/dashboard/orders",
    sidebarName: "Orders",
    navbarName: "Orders",
    icon: ShoppingCart,
    component: Orders
  },
  {
    path: "/dashboard/coupons",
    sidebarName: "Discount Coupons",
    navbarName: "Discount Coupons",
    icon: Loyalty,
    component: Coupons
  },
  {
    path: "/dashboard/banner",
    sidebarName: "Banners",
    navbarName: "Banners",
    icon: LocationOn,
    component: Banners
  },
  {
    path: "/dashboard/settings",
    sidebarName: "Store Settings",
    navbarName: "Store Settings",
    icon: Notifications,
    component: Shop
  },
  {
    path: "/dashboard/blog",
    sidebarName: "Blog",
    navbarName: "Blog",
    icon: Store,
    component: Blog,
  },
  {
    path: "/dashboard/support",
    sidebarName: "Support Tickets",
    navbarName: "Support Tickets",
    icon: Notifications,
    component: Support
  },
  {
    path: "/dashboard/user",
    sidebarName: "User Profile",
    navbarName: "Profile",
    icon: Person,
    component: UserProfile
  },
  { redirect: true, path: "/", to: "/dashboard", navbarName: "Redirect" }
];

export const dropdowns = {
  product: false,
  blog: false
}

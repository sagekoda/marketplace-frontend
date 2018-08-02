//@desc These are the sidebar items/routes on the admin page
//@author Sylvia Onwukwe
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Store from "@material-ui/icons/Store";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import SupervisorAccount from "@material-ui/icons/SupervisorAccount";
import Layers from "@material-ui/icons/Layers";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Loyalty from "@material-ui/icons/Loyalty"
import Language from "@material-ui/icons/Language"
import Settings from "@material-ui/icons/Settings"
import Email from "@material-ui/icons/Email"
import AttachMoney from "@material-ui/icons/AttachMoney"
// core components/admin
import Admin from "../containers/Admin/Dashboard";
import AdminProfile from "../containers/Admin/AdminProfile.jsx";
import AdminOrder from "../containers/Admin/Order.jsx";
import AdminProducts from "../containers/Admin/Products.jsx";
import AdminProductCategory from "../containers/Admin/ProductCategory";
import Vendors from "../containers/Admin/Vendor.jsx";
import AdminStore from "../containers/Admin/StoreSetting.jsx";
import AdminCustomers from "../containers/Admin/Customers.jsx";
import AdminMessage from "../containers/Admin/Messages.jsx";
import AdminBrands from "../containers/Admin/ProductBrands.jsx";
import DiscountCoupon from "../containers/Admin/Coupon.jsx";
import AdminBlog from "../containers/Admin/Blog.jsx";
import Currency from "../containers/Admin/Currency.jsx";
import AdminLanguage from "../containers/Admin/Language.jsx";
import EmailTemplate from "../containers/Admin/EmailTemplates.jsx";

const adminRoutes = [
  {
    path: "/admin",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    exact: true,
    icon: Dashboard,
    component: Admin
  },
  {
    path: "/admin/messages",
    sidebarName: "Messages",
    navbarName: "Messages",
    icon: Email,
    component: AdminMessage
  },
  {
    path: "/admin/products",
    sidebarName: "Products",
    navbarName: "Products",
    icon: Store,
    component: AdminProducts
  },
  {
    path: "/admin/orders",
    sidebarName: "Orders",
    navbarName: "Orders",
    icon: ShoppingCart,
    component: AdminOrder
  },
  {
    path: "/admin/vendors",
    sidebarName: "Vendors",
    navbarName: "Vendors",
    icon: SupervisorAccount,
    component: Vendors
  },
  {
    path: "/admin/customers",
    sidebarName: "Customers",
    navbarName: "Customers",
    icon: SupervisorAccount,
    component: AdminCustomers
  },
  {
    path: "/admin/categories",
    sidebarName: "Product Category",
    navbarName: "Categories",
    icon: Layers,
    component: AdminProductCategory
  },
  {
    path: "/admin/brands",
    sidebarName: "Product Brands",
    navbarName: "brands",
    icon: LocalOffer,
    component: AdminBrands
  },
  {
    path: "/admin/currency",
    sidebarName: "Currency",
    navbarName: "Currency",
    icon: AttachMoney,
    component: Currency
  },
  {
    path: "/admin/language",
    sidebarName: "Language",
    navbarName: "Language",
    icon: Language,
    component: AdminLanguage
  },
  {
    path: "/admin/coupons",
    sidebarName: "Discount Coupons",
    navbarName: "Coupons",
    icon: Loyalty,
    component: DiscountCoupon
  },
  {
    path: "/admin/blog",
    sidebarName: "Blog",
    navbarName: "Blog",
    icon: Language,
    component: AdminBlog
  },
  {
    path: "/admin/templates",
    sidebarName: "Email Template",
    navbarName: "Email Template",
    icon: Language,
    component: EmailTemplate
  },
  {
    path: "/admin/profile",
    sidebarName: "Admin Profile",
    navbarName: "AdmilProfile",
    icon: Person,
    component: AdminProfile
  },
  {
    path: "/admin/settings",
    sidebarName: "Store Settings",
    navbarName: "Store Settings",
    icon: Settings,
    component: AdminStore
  },
  { redirect: true, path: "/", to: "/admin", navbarName: "Redirect" }
];

export default adminRoutes;

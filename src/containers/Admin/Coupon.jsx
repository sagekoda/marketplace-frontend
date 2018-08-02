/*
*@desc the container of the Discount Coupon used by REDUX 
*@author Sylvia Onwukwe
*/
import { connect } from 'react-redux';
import DiscountCouponComponent from '../../Admin/DiscountCoupon/discountCoupon.jsx';
import { fetchCoupons, deleteCoupon} from "../../actions/actions_admin_coupon"
  
const mapStateToProps = state => ({
  adminCoupon: state.adminCoupon
});
const mapDispatchToProps = (dispatch, newProps) => {
  return {
    fetchCoupons: () => {
      dispatch(fetchCoupons());
    },
    deleteCoupon: (couponID) => {
      dispatch(deleteCoupon(couponID));
    }
  }
}

const DiscountCoupon = connect(
  mapStateToProps,
  mapDispatchToProps
)(DiscountCouponComponent);

export default DiscountCoupon;

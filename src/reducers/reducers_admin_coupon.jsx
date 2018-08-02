//@desc discount coupon reducers on the admin marketplace
//@author Sylvia Onwukwe
import { 
    FETCH_COUPONS,
    DELETE_COUPON
     } from "../actions/actions_admin_coupon.jsx";
    
    const adminCoupon = (state = {}, action) => {
        let output;
        switch(action.type){
            case FETCH_COUPONS:
                output = {coupon: action.payload};
            break;
            case DELETE_COUPON:
                output = {deleteCoupon: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminCoupon;
//@desc order reducers on the admin marketplace
//@author Sylvia Onwukwe
import { 
    FETCH_ORDER,
    DELETE_ORDER
     } from "../actions/actions_admin_order.jsx";
    
    const adminOrder = (state = {}, action) => {
        let output;
        switch(action.type){
            case FETCH_ORDER:
                output = {orders: action.payload};
            break;
            case DELETE_ORDER:
                output = {deleteOrders: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminOrder;
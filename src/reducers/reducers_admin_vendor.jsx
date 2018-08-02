//@desc vendor reducers on the admin marketplace
//@author Sylvia Onwukwe
import { 
    FETCH_VENDORS,
    DELETE_VENDORS
     } from "../actions/actions_admin_vendor.jsx";
    
    const adminVendors = (state = {}, action) => {
        let output;
        switch(action.type){
            case FETCH_VENDORS:
                output = {vendors: action.payload};
            break;
            case DELETE_VENDORS:
                output = {deleteVendors: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminVendors;
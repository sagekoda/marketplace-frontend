//@desc customers reducers on the admin marketplace
//@author Sylvia Onwukwe
import { 
    FETCH_CUSTOMERS,
    DELETE_CUSTOMERS
     } from "../actions/actions_admin_customers.jsx";
    
    const adminCustomers = (state = {}, action) => {
        let output;
        switch(action.type){
            case FETCH_CUSTOMERS:
                output = {customers: action.payload};
            break;
            case DELETE_CUSTOMERS:
                output = {deleteCustomers: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminCustomers;
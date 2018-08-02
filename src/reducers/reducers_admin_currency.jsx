//@desc currency reducers on the admin marketplace
//@author Sylvia Onwukwe
import { 
    POST_STORE_CURRENCY,
    FETCH_STORE_CURRENCIES,
    UPDATE_STORE_CURRENCY,
    DELETE_STORE_CURRENCY
     } from "../actions/actions_admin_currency";
    
    const adminCurrency = (state = {}, action) => {
        let output;
        switch(action.type){
            case POST_STORE_CURRENCY:
                output = {addCurrency: action.payload};
            break;
            case FETCH_STORE_CURRENCIES:
                output = {currency: action.payload};
            break;
            case UPDATE_STORE_CURRENCY:
                output = {updateCurrency: action.payload}
            break;
            case DELETE_STORE_CURRENCY:
                output = {deleteCurrency: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminCurrency;
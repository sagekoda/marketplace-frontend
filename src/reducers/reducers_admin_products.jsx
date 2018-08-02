//@desc product reducers on the admin marketplace
//@author Sylvia Onwukwe
import { 
    FETCH_PRODUCT,
    DELETE_PRODUCT
     } from "../actions/actions_admin_product.jsx";
    
    const adminProduct = (state = {}, action) => {
        let output;
        switch(action.type){
            case FETCH_PRODUCT:
                output = {products: action.payload};
            break;
            case DELETE_PRODUCT:
                output = {deleteProducts: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminProduct;
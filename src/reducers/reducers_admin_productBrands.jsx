//@desc product brand reducers used by redux on the admin marketplace
//@author Sylvia Onwukwe
import { 
    FETCH_PRODUCT_BRANDS,
    DELETE_PRODUCT_BRAND
     } from "../actions/actions_admin_productBrands";
    
    const adminBrand = (state = {}, action) => {
        let output;
        switch(action.type){
            case FETCH_PRODUCT_BRANDS:
                output = {brands: action.payload};
            break;
            case DELETE_PRODUCT_BRAND:
                output = {deleteBrand: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminBrand;
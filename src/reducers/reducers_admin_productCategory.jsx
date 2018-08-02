//@desc product category reducers used by redux on the admin marketplace
//@author Sylvia Onwukwe
import { 
    FETCH_PRODUCT_CATEGORIES,
    UPDATE_PRODUCT_CATEGORY_DETAILS,
    DELETE_PRODUCT_CATEGORY
     } from "../actions/actions_admin_productCategory";
    
    const adminCategory = (state = {}, action) => {
        let output;
        switch(action.type){
            case FETCH_PRODUCT_CATEGORIES:
                output = {categories: action.payload};
            break;
            case UPDATE_PRODUCT_CATEGORY_DETAILS:
                output = {updateCategory: action.payload}
            break;
            case DELETE_PRODUCT_CATEGORY:
                output = {deleteCategory: action.payload}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default adminCategory;
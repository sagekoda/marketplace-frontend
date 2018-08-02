import { 
POST_PRODUCT_CATEGORY_DETAILS,
FETCH_PRODUCT_CATEGORIES,
UPDATE_PRODUCT_CATEGORY_DETAILS,
DELETE_PRODUCT_CATEGORY
 } from "../actions/actions_product_category";
 
 import {
    PUT_IMAGE
} from "../actions/actions_imageupload";

const productCategory = (state = {}, action) => {
    let output;
    switch(action.type){
        case POST_PRODUCT_CATEGORY_DETAILS:
            output = {addCategory: action.payload.data};
        break;
        case FETCH_PRODUCT_CATEGORIES:
            output = {categories: action.payload.data};
        break;
        case UPDATE_PRODUCT_CATEGORY_DETAILS:
            output = {updateCategory: action.payload.data}
        break;
        case DELETE_PRODUCT_CATEGORY:
            output = {deleteCategory: action.payload.data}
        break;
        case PUT_IMAGE:
            output = {updateImage: action.payload.data}
        break;
        default:
            output = state;
        break;
    }

    return output;
}

export default productCategory;
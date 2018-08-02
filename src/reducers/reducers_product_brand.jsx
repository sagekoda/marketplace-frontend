import { 
POST_PRODUCT_BRAND_DETAILS,
FETCH_PRODUCT_BRANDS,
UPDATE_PRODUCT_BRAND_DETAILS,
DELETE_PRODUCT_BRAND
 } from "../actions/actions_product_brand";

 import {
     PUT_IMAGE
 } from "../actions/actions_imageupload";

const productBrand = (state = {}, action) => {
    let output;
    let data;
    switch(action.type){
        case POST_PRODUCT_BRAND_DETAILS:
            data = action.payload.success ? action.payload.data : "There was issue creating product brand";
            output = {addBrand: data};
        break;
        case FETCH_PRODUCT_BRANDS:
            data = action.payload.success ? action.payload.data : "There was issue fetching product brand";
            output = {brands: data};
        break;
        case UPDATE_PRODUCT_BRAND_DETAILS:
            data = action.payload.success ? action.payload.data : "There was issue updating product brand";
            output = {updateBrand:data}
        break;
        case DELETE_PRODUCT_BRAND:
            data = action.payload.success ? action.payload.data : "There was issue deleting product brand";   
            output = {deleteBrand:data}
        break;
        case PUT_IMAGE:
            data = action.payload.success ? action.payload.data : "There was issue uploading product brand image"; 
            output = {updateImage:data}
        break;
        default:
            output = state;
        break;
    }

    return output;
}

export default productBrand;
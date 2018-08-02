import { 
    POST_PRODUCT_DETAILS,
    FETCH_PRODUCTS,
    UPDATE_PRODUCT_DETAILS,
    DELETE_PRODUCT
     } from "../actions/actions_product";

import {
    FETCH_PRODUCT_BRANDS
} from "../actions/actions_product_brand";

import {
    FETCH_PRODUCT_CATEGORIES
} from "../actions/actions_product_category";

import {
    PUT_IMAGE
} from "../actions/actions_imageupload";
    
    const product = (state = {}, action) => {
        let output;
        let data
        switch(action.type){
            case POST_PRODUCT_DETAILS:
                data = action.payload.success ? action.payload.data: "There was an error creating product";
                output = {addProduct: data};
            break;
            case FETCH_PRODUCTS:
                data = action.payload.success ? action.payload.data.result: "There was an error fetching data";
                output = {getAll: data};
            break;
            case UPDATE_PRODUCT_DETAILS:
                data = action.payload.success ? action.payload.data: "There was an error updating product";
                output = {updateProduct: data}
            break;
            case DELETE_PRODUCT:
                data = action.payload.success ? action.payload.data: "There was an error deleting product";
                output = {deleteProduct: data}
            break;
            case FETCH_PRODUCT_BRANDS:
                data = action.payload.success ? action.payload.data: "There was an error fetching product category"; 
                output = {productBrands: data}
            break;
            case FETCH_PRODUCT_CATEGORIES:
                data = action.payload.success ? action.payload.data: "There was an error fetching product category";          
                output = {productCategories: data}
            break;
            case PUT_IMAGE:
                data = action.payload.success ? action.payload.data: "There was an error uploading product images";            
                output = {updateImage: data}
            break;
            default:
                output = state;
            break;
        }
    
        return output;
    }
    
    export default product;
//@desc product category action used by redux on the admin marketplace
//@author Sylvia Onwukwe
import 'whatwg-fetch';
export const FETCH_PRODUCT_CATEGORIES = "FETCH_PRODUCT_CATEGORIES";
export const UPDATE_PRODUCT_CATEGORY_DETAILS = "UPDATE_PRODUCT_CATEGORY_DETAILS";
export const DELETE_PRODUCT_CATEGORY = "DELETE_PRODUCT_CATEGORY";


export function loadProductCategories(result){
  return {
    type: FETCH_PRODUCT_CATEGORIES,
    payload: result
  }
}

export function fetchProductCategories(){
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/categories`,
 { method: 'GET'})
 .then(response => response.json())
 .then(json => {
   dispatch(loadProductCategories(json));
 })
 .catch(error => console.log(error))

}
export function loadUpdatedProductCategoryDetails(results){
  return {
    type: UPDATE_PRODUCT_CATEGORY_DETAILS,
    payload: results,
  };
}


export function putProductCategoryDetails(productCategoryDetails, categoryID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/categories/${categoryID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productCategoryDetails)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedProductCategoryDetails(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteProductCategory(results){
  return {
    type: DELETE_PRODUCT_CATEGORY,
    payload: results,
  };
}

export function deleteProductCategory(categoryID) {
  console.log(categoryID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/categories/${categoryID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteProductCategory(json));
    })
    .catch(error => console.log(error));
}





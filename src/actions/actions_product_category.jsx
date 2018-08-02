import 'whatwg-fetch';
export const POST_PRODUCT_CATEGORY_DETAILS = 'POST_PRODUCT_CATEGORY_DETAILS';
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
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/api/v1/categories`,
 { 
   method: 'GET',
   headers : {
    "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
   }
})
 .then(response => response.json())
 .then(json => {
   dispatch(loadProductCategories(json));
 })
 .catch(error => console.log(error))

}


export function loadProductCategoryDetail(results) {
  return {
    type: POST_PRODUCT_CATEGORY_DETAILS,
    payload: results,
  };
}


export function postProductCategoryDetails(productCategoryDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/api/v1/categories`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
    body: JSON.stringify(productCategoryDetails)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadProductCategoryDetail(json));
    })
    .catch(error => console.log(error));
}

export function loadUpdatedProductCategoryDetails(results){
  return {
    type: UPDATE_PRODUCT_CATEGORY_DETAILS,
    payload: results,
  };
}

export function putProductCategoryDetails(productCategoryDetails, categoryID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/api/v1/categories/${categoryID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
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
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/api/v1/categories/${categoryID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteProductCategory(json));
    })
    .catch(error => console.log(error));
}





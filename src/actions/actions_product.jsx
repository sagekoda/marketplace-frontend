import 'whatwg-fetch';
export const POST_PRODUCT_DETAILS = 'POST_PRODUCT_DETAILS';
export const FETCH_PRODUCTS = "FETCH_PRODUCTS";
export const UPDATE_PRODUCT_DETAILS = "UPDATE_PRODUCT_DETAILS";
export const DELETE_PRODUCT = "DELETE_PRODUCT";

export function loadProducts(result){
  return {
    type: FETCH_PRODUCTS,
    payload: result
  }
}

export function fetchProducts(){
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/api/v1/products`,
 {
    method: 'GET',
    headers: {
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    }
  })
 .then(response => response.json())
 .then(json => {
   dispatch(loadProducts(json));
 })
 .catch(error => console.log(error))

}


export function loadProductDetail(results) {
  return {
    type: POST_PRODUCT_DETAILS,
    payload: results,
  };
}


export function postProductDetails(productDetails) {
  console.log(productDetails);
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/api/v1/products`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
    body: JSON.stringify(productDetails)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadProductDetail(json));
    })
    .catch(error => console.log(error));
}

export function loadUpdatedProductDetails(results){
  return {
    type: UPDATE_PRODUCT_DETAILS,
    payload: results,
  };
}

export function putProductDetails(productDetails, productID) {
return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/products/${productID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
    body: JSON.stringify(productDetails)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedProductDetails(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteProduct(results){
  return {
    type: DELETE_PRODUCT,
    payload: results,
    
  };
}

export function deleteProduct(productID) {
return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/products/${productID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteProduct(json));
    })
    .catch(error => console.log(error));
}





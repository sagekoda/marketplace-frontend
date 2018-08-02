import 'whatwg-fetch';
export const POST_PRODUCT_BRAND_DETAILS = 'POST_PRODUCT_BRAND_DETAILS';
export const FETCH_PRODUCT_BRANDS = "FETCH_PRODUCT_BRANDS";
export const UPDATE_PRODUCT_BRAND_DETAILS = "UPDATE_PRODUCT_BRAND_DETAILS";
export const DELETE_PRODUCT_BRAND = "DELETE_PRODUCT_BRAND";


export function loadProductBrands(result){
  return {
    type: FETCH_PRODUCT_BRANDS,
    payload: result
  }
}

export function fetchProductBrands(){
  return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/api/v1/brands`,
 { 
   method: 'GET',
   headers:{
    "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
   }
  })
 .then(response => response.json())
 .then(json => {
   dispatch(loadProductBrands(json));
 })
 .catch(error => console.log(error))

}


export function loadProductBrandDetail(results) {
  return {
    type: POST_PRODUCT_BRAND_DETAILS,
    payload: results,
  };
}


export function postProductBrandDetails(productBrandDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/brands`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
    body: JSON.stringify(productBrandDetails)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadProductBrandDetail(json));
    })
    .catch(error => console.log(error));
}

export function loadUpdatedProductBrandDetails(results){
  return {
    type: UPDATE_PRODUCT_BRAND_DETAILS,
    payload: results,
  };
}

export function putProductBrandDetails(productBrandDetails, brandID) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/brands/${brandID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
    body: JSON.stringify(productBrandDetails)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedProductBrandDetails(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteProductBrand(results){
  return {
    type: DELETE_PRODUCT_BRAND,
    payload: results,
  };
}

export function deleteProductBrand(brandID) {
  console.log(brandID);
  return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/brands/${brandID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteProductBrand(json));
    })
    .catch(error => console.log(error));
}





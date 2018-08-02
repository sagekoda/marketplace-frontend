//@desc product actions used by redux on admin marketplace
//@author Sylvia Onwukwe
import 'whatwg-fetch';
export const FETCH_PRODUCT = "FETCH_PRODUCT";
export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export function loadProduct(result){
  return {
    type: FETCH_PRODUCT,
    payload: result
  }
}

export function fetchProduct(){
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/products`,
 { method: 'GET'})
 .then(response => response.json())
 .then(json => {
   dispatch(loadProduct(json));
 })
 .catch(error => console.log(error))

}

export function loadUpdatedProducts(results){
  return {
    type: UPDATE_PRODUCT,
    payload: results,
  };
}

export function putProduct(products, productID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/products/${productID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(products)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedProducts(json));
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
  console.log(productID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/products/${productID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteProduct(json));
    })
    .catch(error => console.log(error));
}





//@desc this is currency actions used by redux
//@author Sylvia Onwukwe
import 'whatwg-fetch';
export const POST_STORE_CURRENCY = 'POST_STORE_CURRENCY';
export const FETCH_STORE_CURRENCIES = "FETCH_STORE_CURRENCIES";
export const UPDATE_STORE_CURRENCY = "UPDATE_STORE_CURRENCY";
export const DELETE_STORE_CURRENCY = "DELETE_STORE_CURRENCY";


export function loadStoreCurrencies(result){
  return {
    type: FETCH_STORE_CURRENCIES,
    payload: result
  }
}

export function fetchStoreCurrencies(){
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/currencies`,
 { method: 'GET'})
 .then(response => response.json())
 .then(json => {
   dispatch(loadStoreCurrencies(json));
 })
 .catch(error => console.log(error))

}


export function loadStoreCurrency(results) {
  return {
    type: POST_STORE_CURRENCY,
    payload: results,
  };
}


export function postStoreCurrency(productStoreCurrency) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/currencies`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(productStoreCurrency)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadStoreCurrency(json));
    })
    .catch(error => console.log(error));
}

export function loadUpdatedStoreCurrency(results){
  return {
    type: UPDATE_STORE_CURRENCY,
    payload: results,
  };
}

export function putStoreCurrency(StoreCurrency, currencyID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/currencies/${currencyID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(StoreCurrency)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedStoreCurrency(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteStoreCurrency(results){
  return {
    type: DELETE_STORE_CURRENCY,
    payload: results,
  };
}

export function deleteStoreCurrency(currencyID) {
  console.log(currencyID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/currencies/${currencyID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteStoreCurrency(json));
    })
    .catch(error => console.log(error));
}





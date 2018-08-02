//@desc language actions used by redux
//@author Sylvia Onwukwe
import 'whatwg-fetch';
export const POST_STORE_LANGUAGE = 'POST_STORE_LANGUAGE';
export const FETCH_STORE_LANGUAGES = "FETCH_STORE_LANGUAGES";
export const UPDATE_STORE_LANGUAGE = "UPDATE_STORE_LANGUAGE";
export const DELETE_STORE_LANGUAGE  = "DELETE_STORE_LANGUAGE";


export function loadStoreLanguages(result){
  return {
    type: FETCH_STORE_LANGUAGES,
    payload: result
  }
}

export function fetchStoreLanguages(){
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/languages`,
 { method: 'GET'})
 .then(response => response.json())
 .then(json => {
   dispatch(loadStoreLanguage(json));
 })
 .catch(error => console.log(error))

}


export function loadStoreLanguage(results) {
  return {
    type: POST_STORE_LANGUAGE,
    payload: results,
  };
}


export function postStoreLanguage(storeLanguage) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/languages`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(storeLanguage)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadStoreLanguage(json));
    })
    .catch(error => console.log(error));
}

export function loadUpdatedStoreLanguage(results){
  return {
    type: UPDATE_STORE_LANGUAGE,
    payload: results,
  };
}

export function putStoreLanguage(StoreLanguage, languageID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/languages/${languageID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(StoreLanguage)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedStoreLanguage(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteStoreLanguage(results){
  return {
    type: DELETE_STORE_LANGUAGE,
    payload: results,
  };
}

export function deleteStoreLanguage(languageID) {
  console.log(languageID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/languages/${languageID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteStoreLanguage(json));
    })
    .catch(error => console.log(error));
}





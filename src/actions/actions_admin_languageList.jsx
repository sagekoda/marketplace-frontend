//@desc language list actions used by redux
//@author Sylvia Onwukwe
import 'whatwg-fetch';
export const POST_LANGUAGE_LIST = 'POST_LANGUAGE_LIST';
export const FETCH_LANGUAGES_LIST = "FETCH_LANGUAGES_LIST";
export const UPDATE_LANGUAGE_LIST = "UPDATE_LANGUAGE_LIST";
export const DELETE_LANGUAGE_LIST  = "DELETE_LANGUAGE_LIST";


export function loadLanguagesList(result){
  return {
    type: FETCH_LANGUAGES_LIST,
    payload: result
  }
}

export function fetchLanguagesList(){
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/language-lists`,
 { method: 'GET'})
 .then(response => response.json())
 .then(json => {
   dispatch(loadLanguagesList(json));
 })
 .catch(error => console.log(error))

}


export function loadLanguageList(results) {
  return {
    type: POST_LANGUAGE_LIST,
    payload: results,
  };
}


export function postLanguageList(languageList) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/language-lists`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(languageList)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadLanguageList(json));
    })
    .catch(error => console.log(error));
}

export function loadUpdatedLanguageList(results){
  return {
    type: UPDATE_LANGUAGE_LIST,
    payload: results,
  };
}

export function putLanguageList(languageList, languageListID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/language-lists/${languageListID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(languageList)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedLanguageList(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteLanguageList(results){
  return {
    type: DELETE_LANGUAGE_LIST,
    payload: results,
  };
}

export function deleteLanguageList(languageListID) {
  console.log(languageListID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/language-lists/${languageListID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteLanguageList(json));
    })
    .catch(error => console.log(error));
}





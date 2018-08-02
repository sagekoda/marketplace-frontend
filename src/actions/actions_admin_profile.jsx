//@desc the admin profile actions used by Redux
//@author Sylvia Onwukwe
import 'whatwg-fetch';
export const POST_ADMIN_PROFILE = 'POST_ADMIN_PROFILE';
export const FETCH_ADMIN_PROFILE_DETAILS = "FETCH_ADMIN_PROFILE_DETAILS";
export const UPDATE_ADMIN_PROFILE = "UPDATE_ADMIN_PROFILE";
export const DELETE_ADMIN_PROFILE_DETAILS = "DELETE_ADMIN_PROFILE_DETAILS";


export function loadAdminProfileDetails(result){
  return {
    type: FETCH_ADMIN_PROFILE_DETAILS,
    payload: result
  }
}

export function fetchAdminProfileDetails(){
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins`,
 { method: 'GET'})
 .then(response => response.json())
 .then(json => {
   dispatch(loadAdminProfileDetails(json));
 })
 .catch(error => console.log(error))

}


export function loadAdminProfile(results) {
  return {
    type: POST_ADMIN_PROFILE,
    payload: results,
  };
}


export function postAdminProfile(AdminProfile) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(AdminProfile)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadAdminProfile(json));
    })
    .catch(error => console.log(error));
}

export function loadUpdatedAdminProfile(results){
  return {
    type: UPDATE_ADMIN_PROFILE,
    payload: results,
  };
}

export function putAdminProfile(AdminProfile, adminID) {
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins/${adminID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(AdminProfile)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedAdminProfile(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteAdminProfileDetails(results){
  return {
    type: DELETE_ADMIN_PROFILE_DETAILS,
    payload: results,
  };
}

export function deleteAdminProfileDetails(adminID) {
  console.log(adminID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins/${adminID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteAdminProfileDetails(json));
    })
    .catch(error => console.log(error));
}





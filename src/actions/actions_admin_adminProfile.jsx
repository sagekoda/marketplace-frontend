//@desc admin profile action used by redux
//@author Sylvia Onwukwe

import 'whatwg-fetch';
export const UPDATE_ADMIN_PROFILE = "UPDATE_ADMIN_PROFILE";
export const FETCH_ADMIN_PROFILE = "FETCH_ADMIN_PROFILE";

export function loadUpdatedAdminProfile(result){
    return {
        type: UPDATE_ADMIN_PROFILE,
        payload: result
    }
}

export function updatedAdminProfile(adminProfile, adminID){
    return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins/${adminID}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminProfile)
    })
    .then(response => response.json())
    .then(json => {
        dispatch(loadUpdatedAdminProfile(json));
    })
    .catch(err => console.log(err))
}

export function loadAdminUpdate(result){
    return {
        type: FETCH_ADMIN_PROFILE,
        payload: result
    }
}

export function fetchAdminProfile(adminID){
    return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/admins/${adminID}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
        dispatch(loadAdminUpdate(json));
    })
    .catch(err => console.log(err))
}


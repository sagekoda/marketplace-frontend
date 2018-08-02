import 'whatwg-fetch';
export const UPDATE_VENDOR_PROFILE = "UPDATE_VENDOR_PROFILE";
export const FETCH_VENDOR_PROFILE = "FETCH_VENDOR_PROFILE";
export function loadUpdatedVendorProfile(result){
    return {
        type: UPDATE_VENDOR_PROFILE,
        payload: result
    }
}

export function updatedVendorProfile(vendorProfile, vendorID){
return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/api/v1/vendors/${vendorID}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
        },
        body: JSON.stringify(vendorProfile)
    })
    .then(response => response.json())
    .then(json => {
        dispatch(loadUpdatedVendorProfile(json));
    })
    .catch(err => console.log(err))
}

export function loadUserUpdate(result){
    return {
        type: FETCH_VENDOR_PROFILE,
        payload: result
    }
}

export function fetchUserProfile(vendorID){
    return dispatch => fetch(`${process.env.REACT_APP_DEV_API_URL}/api/v1/vendors/${vendorID}`, {
        method: 'GET',
        headers: {
            "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
        }
    })
    .then(response => response.json())
    .then(json => {
        dispatch(loadUserUpdate(json));
    })
    .catch(err => console.log(err))
}


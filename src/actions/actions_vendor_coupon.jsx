import 'whatwg-fetch';
export const POST_COUPON_DETAILS = 'POST_COUPON_DETAILS';
export const FETCH_COUPONS = "FETCH_COUPONS";
export const UPDATE_COUPON_DETAILS = "UPDATE_COUPON_DETAILS";
export const DELETE_COUPON = "DELETE_COUPON";

export function loadCoupons(result){
  return {
    type: FETCH_COUPONS,
    payload: result
  }
}

export function fetchCoupons(){
  return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/coupons`,
 {
    method: 'GET',
    headers: {
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    }
  })
 .then(response => response.json())
 .then(json => {
   dispatch(loadCoupons(json));
 })
 .catch(error => console.log(error))

}


export function loadCouponDetail(results) {
  return {
    type: POST_COUPON_DETAILS,
    payload: results,
  };
}


export function postCouponDetails(couponDetails) {
  return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/coupons`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
    body: JSON.stringify(couponDetails)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadCouponDetail(json));
    })
    .catch(error => console.log(error));
}

export function loadUpdatedCouponDetails(results){
  return {
    type: UPDATE_COUPON_DETAILS,
    payload: results,
  };
}

export function putCouponDetails(couponDetails, couponID) {
return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/coupons/${couponID}`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
    body: JSON.stringify(couponDetails)
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadUpdatedCouponDetails(json));
    })
    .catch(error => console.log(error));
}

export function loadDeleteCoupon(results){
  return {
    type: DELETE_COUPON,
    payload: results,
    
  };
}

export function deleteCoupon(couponID) {
return dispatch => fetch(`${process.env.REACT_APP_API_URL_CALL}/api/v1/coupons/${couponID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      "authorization" : `Bearer ${JSON.parse(localStorage["bezop-login:vendor"]).accessToken}`
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteCoupon(json));
    })
    .catch(error => console.log(error));
}





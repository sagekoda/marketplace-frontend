//@desc vendor actions used by redux on admin marketplace
//@author Sylvia Onwukwe
import 'whatwg-fetch';
export const FETCH_VENDORS = "FETCH_VENDORS";
export const DELETE_VENDORS = "DELETE_VENDORS";


export function loadVendors(result){
  return {
    type: FETCH_VENDORS,
    payload: result
  }
}

export function fetchVendors(){
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/vendors`,
 { method: 'GET'})
 .then(response => response.json())
 .then(json => {
   dispatch(loadVendors(json));
 })
 .catch(error => console.log(error))

}

export function loadDeleteVendors(results){
  return {
    type: DELETE_VENDORS,
    payload: results,
  };
}

export function deleteVendors(vendorID) {
  console.log(vendorID);
  return dispatch => fetch(`${process.env.REACT_APP_PROD_API_URL}/vendors/${vendorID}`, {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
  })
    .then(response => response.json())
    .then((json) => {
      dispatch(loadDeleteVendors(json));
    })
    .catch(error => console.log(error));
}




